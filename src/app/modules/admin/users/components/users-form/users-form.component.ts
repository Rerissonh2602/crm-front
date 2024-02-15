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

import { PlenaryValidators } from '@plenary/validators';
import { PlenaryToastService } from '@plenary/services/toast';

import { CompaniesService } from '../../../../companies/companies.service';
import { CompanyInterface } from '../../../../companies/companies.types';
import { RolesService } from '../../../roles/roles.service';
import { RoleInterface } from '../../../roles/roles.types';
import { UsersService } from '../../users.service';

@Component({
  selector: 'users-form',
  templateUrl: './users-form.component.html',
  styles: [
    `
      .users-form-panel {
        @screen md {
          @apply w-128;
        }
      }
    `,
  ],
  encapsulation: ViewEncapsulation.None,
})
export class UsersFormComponent implements OnInit, OnDestroy {
  public form: UntypedFormGroup;
  public companies: CompanyInterface[] = [];
  public roles: RoleInterface[] = [];
  private readonly unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public readonly data: { id: number },

    private readonly dialog: MatDialogRef<UsersFormComponent>,

    private readonly formBuilder: UntypedFormBuilder,

    private readonly service: UsersService,

    private readonly rolesService: RolesService,

    private readonly companiesService: CompaniesService,

    private readonly toastService: PlenaryToastService
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group(
      {
        name: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        password: [null],
        confirmPassword: [null],
        roleId: [null, [Validators.required]],
        companyId: [null, []],
      },
      {
        validators: PlenaryValidators.mustMatch('password', 'confirmPassword'),
      }
    );

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
            'Não foi possível obter os perfis de acesso.',
            { handleRequest: true }
          );
        },
      });

    this.companiesService
      .findAll()
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe({
        next: (res) => {
          this.companies = res;
        },
        error: (error) => {
          this.toastService.handleMessage(
            error,
            'Não foi possível obter as empresas.',
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
            this.form.patchValue(res);
          },
          error: (error) => {
            this.toastService.handleMessage(
              error,
              'Não foi possível obter o usuário.',
              { handleRequest: true }
            );
          },
        });
    } else {
      this.form.get('password').addValidators([Validators.required]);
      this.form.get('confirmPassword').addValidators([Validators.required]);
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
        .update(this.data.id, { ...this.form.value, id: this.data.id })
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
              'Não foi possível modificar o usuário.',
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
              'Não foi possível criar o usuário.',
              { handleRequest: true }
            );
          },
        });
    }
  }
}
