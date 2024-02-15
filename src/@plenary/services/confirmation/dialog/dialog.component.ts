import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PlenaryConfirmationConfig } from '@plenary/services/confirmation/confirmation.types';

@Component({
  selector: 'plenary-confirmation-dialog',
  templateUrl: './dialog.component.html',
  styles: [
    `
      .plenary-confirmation-dialog-panel {
        @screen md {
          @apply w-128;
        }

        .mat-mdc-dialog-container {
          .mat-mdc-dialog-surface {
            padding: 0 !important;
          }
        }
      }
    `,
  ],
  encapsulation: ViewEncapsulation.None,
})
export class PlenaryConfirmationDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: PlenaryConfirmationConfig
  ) {}
}
