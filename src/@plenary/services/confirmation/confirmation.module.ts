import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { PlenaryConfirmationService } from '@plenary/services/confirmation/confirmation.service';
import { PlenaryConfirmationDialogComponent } from '@plenary/services/confirmation/dialog/dialog.component';

@NgModule({
  declarations: [PlenaryConfirmationDialogComponent],
  imports: [MatButtonModule, MatDialogModule, MatIconModule, CommonModule],
  providers: [PlenaryConfirmationService],
})
export class PlenaryConfirmationModule {
  constructor() {}
}
