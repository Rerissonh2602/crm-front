import { NgModule } from '@angular/core';
import { PlenaryPlatformService } from '@plenary/services/platform/platform.service';

@NgModule({
  providers: [PlenaryPlatformService],
})
export class PlenaryPlatformModule {
  constructor() {}
}
