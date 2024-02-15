import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlenaryToastComponent } from './toast.component';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@NgModule({
  imports: [CommonModule, MatIconModule, MatProgressBarModule],
  declarations: [PlenaryToastComponent],
  exports: [PlenaryToastComponent],
})
export class PlenaryToastModule {}
