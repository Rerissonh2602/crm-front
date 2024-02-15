import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { PlenaryFullscreenComponent } from '@plenary/components/fullscreen/fullscreen.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [PlenaryFullscreenComponent],
  imports: [MatButtonModule, MatIconModule, MatTooltipModule, CommonModule],
  exports: [PlenaryFullscreenComponent],
})
export class PlenaryFullscreenModule {}
