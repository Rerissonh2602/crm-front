import { NgModule, Optional, SkipSelf } from '@angular/core';
import { MATERIAL_SANITY_CHECKS } from '@angular/material/core';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';

import { PlenaryConfirmationModule } from '@plenary/services/confirmation';
import { PlenaryLoadingModule } from '@plenary/services/loading';
import { PlenaryMediaWatcherModule } from '@plenary/services/media-watcher/media-watcher.module';
import { PlenaryPlatformModule } from '@plenary/services/platform/platform.module';
import { PlenarySplashScreenModule } from '@plenary/services/splash-screen/splash-screen.module';
import { PlenaryUtilsModule } from '@plenary/services/utils/utils.module';

@NgModule({
  imports: [
    PlenaryConfirmationModule,
    PlenaryLoadingModule,
    PlenaryMediaWatcherModule,
    PlenaryPlatformModule,
    PlenarySplashScreenModule,
    PlenaryUtilsModule,
  ],
  providers: [
    {
      provide: MATERIAL_SANITY_CHECKS,
      useValue: {
        doctype: true,
        theme: false,
        version: true,
      },
    },
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: {
        appearance: 'outline',
        floatLabel: 'never',
      },
    },
  ],
})
export class PlenaryModule {
  constructor(@Optional() @SkipSelf() parentModule?: PlenaryModule) {
    if (parentModule) {
      throw new Error(
        'PlenaryModule has already been loaded. Import this module in the AppModule only!'
      );
    }
  }
}
