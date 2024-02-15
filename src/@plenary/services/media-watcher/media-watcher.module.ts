import { NgModule } from '@angular/core';
import { PlenaryMediaWatcherService } from '@plenary/services/media-watcher/media-watcher.service';

@NgModule({
  providers: [PlenaryMediaWatcherService],
})
export class PlenaryMediaWatcherModule {
  constructor() {}
}
