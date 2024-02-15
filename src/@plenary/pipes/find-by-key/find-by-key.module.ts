import { NgModule } from '@angular/core';
import { PlenaryFindByKeyPipe } from '@plenary/pipes/find-by-key/find-by-key.pipe';

@NgModule({
  declarations: [PlenaryFindByKeyPipe],
  exports: [PlenaryFindByKeyPipe],
})
export class PlenaryFindByKeyPipeModule {}
