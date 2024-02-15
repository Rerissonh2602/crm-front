import {
  Component,
  Inject,
  OnDestroy,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { finalize, Subject, takeUntil } from 'rxjs';

import { PlenaryToastService } from '@plenary/services/toast';

import { MenusService } from '../../menus.service';
import { MenusGroupsService } from '../../../menus-groups/menus-groups.service';
import { MenuGroupInterface } from '../../../menus-groups/menus-groups.types';
import { MenuInterface } from '../../menus.types';

@Component({
  selector: 'menus-form',
  templateUrl: './menus-form.component.html',
  styles: [
    `
      .menus-form-panel {
        @screen md {
          @apply w-128;
        }
      }
    `,
  ],
  encapsulation: ViewEncapsulation.None,
})
export class MenusFormComponent implements OnInit, OnDestroy {
  public form: UntypedFormGroup;
  public menu: MenuInterface;
  public menusGroups: MenuGroupInterface[];
  private readonly unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public readonly data: { id: number },

    private readonly dialog: MatDialogRef<MenusFormComponent>,

    private readonly formBuilder: UntypedFormBuilder,

    private readonly service: MenusService,

    private readonly menusGroupsService: MenusGroupsService,

    private readonly toastService: PlenaryToastService,
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required]],
      route: ['', [Validators.required]],
      icon: ['', [Validators.required]],
      menuKey: ['', [Validators.required]],
      menuGroupId: ['', [Validators.required]],
    });

    this.menusGroupsService
      .findAll()
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe({
        next: (res) => {
          this.menusGroups = res;
        },
        error: (error) => {
          this.toastService.handleMessage(
            error,
            'Não foi possível obter os grupos de menus.',
            { handleRequest: true }
          );
        },
      });

    if (this.data.id) {
      this.service
        .findOne(this.data.id)
        .pipe(takeUntil(this.unsubscribeAll))
        .subscribe({
          next: (res) => {
            this.menu = res;
            this.form.patchValue(res);
          },
          error: (error) => {
            this.toastService.handleMessage(
              error,
              'Não foi possível obter o menu.',
              { handleRequest: true }
            );
          },
        });
    }
  }

  ngOnDestroy(): void {
    this.unsubscribeAll.next(null);
    this.unsubscribeAll.complete();
  }

  handleSaveOrUpdate(): void {
    this.form.disable();

    if (this.data.id) {
      this.service
        .update(this.data.id, {
          ...this.form.value,
          actionsMenus: this.menu.actionsMenus,
          id: this.data.id,
        })
        .pipe(takeUntil(this.unsubscribeAll))
        .pipe(
          finalize(() => {
            this.form.enable();
          })
        )
        .subscribe({
          next: (res) => {
            this.toastService.handleMessage(res, null, {
              handleRequest: true,
            });
            this.dialog.close(true);
          },
          error: (error) => {
            this.toastService.handleMessage(
              error,
              'Não foi possível modificar o menu.',
              { handleRequest: true }
            );
          },
        });
    } else {
      this.service
        .create(this.form.value)
        .pipe(takeUntil(this.unsubscribeAll))
        .pipe(
          finalize(() => {
            this.form.enable();
          })
        )
        .subscribe({
          next: (res) => {
            this.toastService.handleMessage(res, null, {
              handleRequest: true,
            });
            this.dialog.close(true);
          },
          error: (error) => {
            this.toastService.handleMessage(
              error,
              'Não foi possível criar o menu.',
              { handleRequest: true }
            );
          },
        });
    }
  }

  syncPrivileges(actionsMenus: any[]): void {
    this.menu.actionsMenus = actionsMenus;
  }
}
