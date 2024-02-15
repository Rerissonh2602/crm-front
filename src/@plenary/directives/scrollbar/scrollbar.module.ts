import { NgModule } from '@angular/core';
import { PlenaryScrollbarDirective } from '@plenary/directives/scrollbar/scrollbar.directive';

@NgModule({
  declarations: [PlenaryScrollbarDirective],
  exports: [PlenaryScrollbarDirective],
})
export class PlenaryScrollbarModule {}
