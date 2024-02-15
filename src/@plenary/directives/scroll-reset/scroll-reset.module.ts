import { NgModule } from '@angular/core';
import { PlenaryScrollResetDirective } from '@plenary/directives/scroll-reset/scroll-reset.directive';

@NgModule({
  declarations: [PlenaryScrollResetDirective],
  exports: [PlenaryScrollResetDirective],
})
export class PlenaryScrollResetModule {}
