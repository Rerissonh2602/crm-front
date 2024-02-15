import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { MatCheckboxChange } from '@angular/material/checkbox';

import { PlenaryToastService } from '@plenary/services/toast';

import { ActionInterface } from '../../../actions/actions.types';
import { ActionsService } from '../../../actions/actions.service';
import { RoleInterface } from '../../../roles/roles.types';
import { RolesService } from '../../../roles/roles.service';
import { MenuActionInterface, PrivilegeInterface } from '../../menus.types';

@Component({
  selector: 'privileges-form',
  templateUrl: './privileges-form.component.html',
  styles: [
    `
      .menus-form-panel {
        @screen md {
          @apply w-128;
        }
      }
    `,
  ],
  // Encapsulation: ViewEncapsulation.None,
})
export class PrivilegesFormComponent implements OnInit {
  public displayedColumns: string[] = ['role'];
  public actions: ActionInterface[] = [];
  public roles: RoleInterface[] = [];
  public end: number;
  private readonly unsubscribeAll: Subject<any> = new Subject<any>();

  @Input() actionsMenus!: any;
  @Output() emitter = new EventEmitter<any[]>();

  constructor(
    private readonly actionsService: ActionsService,

    private readonly rolesService: RolesService,

    private readonly toastService: PlenaryToastService,
  ) {}

  async ngOnInit(): Promise<void> {
    this.actionsService
      .findAll()
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe({
        next: (res) => {
          this.actions = res;
          this.actions.forEach((action) => {
            this.displayedColumns.push(action.name);
          });
          this.end = this.displayedColumns.length;
        },
        error: (error) => {
          this.toastService.handleMessage(
            error,
            'Não foi possível obter as ações.',
            { handleRequest: true }
          );
        },
      });

    this.rolesService
      .findAll()
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe({
        next: (res) => {
          this.roles = res;
        },
        error: (error) => {
          this.toastService.handleMessage(
            error,
            'Não foi possível obter os perfis de acessos.',
            { handleRequest: true }
          );
        },
      });
  }

  setPrivilege(
    event: MatCheckboxChange,
    menuAction: MenuActionInterface,
    roleId: number
  ): void {
    if (event.checked) {
      menuAction?.privileges.push({
        actionMenuId: menuAction.id,
        roleId,
      });
    } else {
      menuAction?.privileges.splice(
        menuAction?.privileges.findIndex(
          (el) => el.actionMenuId === menuAction.id && el.roleId === roleId
        ),
        1
      );
    }

    this.emitter.emit(this.actionsMenus);
  }

  check(privileges: PrivilegeInterface[], roleId: number): boolean {
    return (
      privileges?.find((privilege) => privilege.roleId === roleId) !== undefined
    );
  }
}
