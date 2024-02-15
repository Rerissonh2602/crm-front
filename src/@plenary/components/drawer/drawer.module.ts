import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlenaryDrawerComponent } from '@plenary/components/drawer/drawer.component';

@NgModule({
  declarations: [PlenaryDrawerComponent],
  imports: [CommonModule],
  exports: [PlenaryDrawerComponent],
})
export class PlenaryDrawerModule {}
