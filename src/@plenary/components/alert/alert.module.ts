import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { PlenaryAlertComponent } from '@plenary/components/alert/alert.component';

@NgModule({
  declarations: [PlenaryAlertComponent],
  imports: [CommonModule, MatButtonModule, MatIconModule],
  exports: [PlenaryAlertComponent],
})
export class PlenaryAlertModule {}
