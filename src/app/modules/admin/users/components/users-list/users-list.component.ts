import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Subject, takeUntil } from 'rxjs';

import { PlenaryConfirmationService } from '@plenary/services/confirmation';
import {
  PlenaryTableInterface,
  PlenaryTablePaginatorInterface,
  PlenaryTableSortInterface,
} from '@plenary/components/table';
import { PlenaryToastService } from '@plenary/services/toast';
import { PlenaryHeaderActionInterface } from '@plenary/components/header';

import { UserInterface } from '../../users.types';
import { UsersService } from '../../users.service';
import { UsersFormComponent } from '../users-form/users-form.component';

@Component({
  selector: 'users-list',
  templateUrl: './users-list.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class UsersListComponent implements OnInit, OnDestroy {
  public data: UserInterface[] = null;
  public config: PlenaryTableInterface = {
    headers: [
      { name: 'Nome', key: 'name' },
      { name: 'Email', key: 'email' },
      { name: 'Empresa', key: 'company.name' },
      { name: 'Perfil de Acesso', key: 'role.name' },
      { name: 'Criado em', key: 'createdAt' },
      { name: 'Modificado em', key: 'updatedAt' },
    ],
    content: [
      { type: 'field', key: 'name' },
      { type: 'field', key: 'email' },
      { type: 'field', key: 'company.name' },
      { type: 'field', key: 'role.name' },
      { type: 'timestamp', key: 'createdAt' },
      { type: 'timestamp', key: 'updatedAt' },
    ],
    actions: true,
    searchable: true,
    searchableConfig: {
      requestPagination: false,
    },
    selection: true,
    paginator: true,
    paginatorConfig: {
      requestPagination: false,
    },
    sortable: true,
    sortConfig: {
      requestPagination: false,
    },
  };

  public sort: PlenaryTableSortInterface;
  public paginator: PlenaryTablePaginatorInterface;
  public selection = new SelectionModel<number>(true, []);
  private readonly unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(
    private readonly confirmationService: PlenaryConfirmationService,
    private readonly service: UsersService,
    private readonly toastService: PlenaryToastService,
    private readonly matDialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getAll();
  }

  getAll(): void {
    this.service
      .findAll()
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe((res: UserInterface[]) => {
        this.data = res;
      });
  }

  ngOnDestroy(): void {
    this.unsubscribeAll.next(null);
    this.unsubscribeAll.complete();
  }

  handleAction(data: PlenaryHeaderActionInterface): void {
    let dialog: MatDialogRef<UsersFormComponent> = null;

    switch (data.action) {
      case 'form':
        dialog = this.matDialog.open(UsersFormComponent, {
          data: { id: data.id },
          panelClass: ['full-screen-modal', 'dialog-form']
        });

        dialog
          .afterClosed()
          .pipe(takeUntil(this.unsubscribeAll))
          .subscribe((res) => {
            if (res) {
              this.getAll();
            }
          });
        break;
      case 'delete':
        const dialogRef = this.confirmationService.open();

        dialogRef.afterClosed().subscribe((res) => {
          if (res === 'confirmed') {
            this.service.delete(data.id).subscribe({
              next: (res) => {
                this.getAll();
                this.toastService.handleMessage(res, null, {
                  handleRequest: true,
                });
              },
              error: (error) => {
                this.toastService.handleMessage(
                  error,
                  'Não foi possível remover o usuário.',
                  { handleRequest: true }
                );
              },
            });
          }
        });
        break;
    }
  }

  handleSort(event: PlenaryTableSortInterface): void {
    this.sort = event;
    this.getAll();
  }

  handlePaginator(event: PlenaryTablePaginatorInterface): void {
    this.paginator = event;
    this.getAll();
  }
}
