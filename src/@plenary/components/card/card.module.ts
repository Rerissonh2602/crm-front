import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlenaryCardComponent } from '@plenary/components/card/card.component';

@NgModule({
  declarations: [PlenaryCardComponent],
  imports: [CommonModule],
  exports: [PlenaryCardComponent],
})
export class PlenaryCardModule {}
