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
import { PlenaryToastService } from '@plenary/services/toast';
import { finalize, Subject, takeUntil } from 'rxjs';

import { LeadsColumnsService } from '../../leads-columns.service';
import { CompaniesService } from '../../../../companies/companies.service';
import { CompanyInterface } from '../../../../companies/companies.types';

@Component({
  selector: 'leads-columns-form',
  templateUrl: './leads-columns-form.component.html',
  styles: [
    `
      .leads-columns-form-panel {
        @screen md {
          @apply w-128;
        }
      }
    `,
  ],
  encapsulation: ViewEncapsulation.None,
})
export class LeadsColumnsFormComponent implements OnInit, OnDestroy {
  public form: UntypedFormGroup;
  public companies: CompanyInterface[] = [];
  private readonly unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public readonly data: { id: number },

    private readonly dialog: MatDialogRef<LeadsColumnsFormComponent>,

    private readonly formBuilder: UntypedFormBuilder,

    private readonly companiesService: CompaniesService,

    private readonly service: LeadsColumnsService,

    private readonly toastService: PlenaryToastService
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required]],
      companyId: ['', []],
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
              'Não foi possível obter os funis de vendas.',
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
              'Não foi possível criar o funil de venda.',
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
              'Não foi possível criar o funil de venda.',
              { handleRequest: true }
            );
          },
        });
    }
  }
}
