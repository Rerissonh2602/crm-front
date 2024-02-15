import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { merge } from 'lodash-es';

import { PlenaryConfirmationDialogComponent } from './dialog/dialog.component';
import { PlenaryConfirmationConfig } from './confirmation.types';

@Injectable({
  providedIn: 'root',
})
export class PlenaryConfirmationService {
  private readonly defaultConfig: PlenaryConfirmationConfig = {
    title: 'Confirmar ação',
    message:
      'Você tem certeza de que deseja confirmar esta ação? <span class="font-semibold">Essa ação não pode ser desfeita!</span>',
    icon: {
      show: true,
      name: 'heroicons_outline:exclamation',
      color: 'warn',
    },
    actions: {
      confirm: {
        show: true,
        label: 'Confirmar',
        color: 'primary',
      },
      cancel: {
        show: true,
        label: 'Cancelar',
      },
    },
    dismissible: false,
  };

  constructor(private readonly matDialog: MatDialog) {}

  open(
    config: PlenaryConfirmationConfig = {}
  ): MatDialogRef<PlenaryConfirmationDialogComponent> {
    const userConfig = merge({}, this.defaultConfig, config);

    return this.matDialog.open(PlenaryConfirmationDialogComponent, {
      autoFocus: false,
      disableClose: !userConfig.dismissible,
      data: userConfig,
      panelClass: 'plenary-confirmation-dialog-panel',
    });
  }
}
