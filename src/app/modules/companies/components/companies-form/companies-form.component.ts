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

import { CompaniesService } from '../../companies.service';

@Component({
  selector: 'companies-form',
  templateUrl: './companies-form.component.html',
  styles: [
    `
      .companies-form-panel {
        @screen md {
          @apply w-128;
        }
      }
    `,
  ],
  encapsulation: ViewEncapsulation.None,
})
export class CompaniesFormComponent implements OnInit, OnDestroy {
  public form: UntypedFormGroup;
  private readonly unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public readonly data: { id: number },

    private readonly dialog: MatDialogRef<CompaniesFormComponent>,

    private readonly formBuilder: UntypedFormBuilder,

    private readonly service: CompaniesService,

    private readonly toastService: PlenaryToastService
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required]],
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
