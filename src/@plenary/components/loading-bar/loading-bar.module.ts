import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { PlenaryLoadingBarComponent } from '@plenary/components/loading-bar/loading-bar.component';

@NgModule({
  declarations: [PlenaryLoadingBarComponent],
  imports: [CommonModule, MatProgressBarModule],
  exports: [PlenaryLoadingBarComponent],
})
export class PlenaryLoadingBarModule {}
