import { ModuleWithProviders, NgModule } from '@angular/core';
import { PLENARY_APP_CONFIG } from '@plenary/services/config/config.constants';

@NgModule()
export class PlenaryConfigModule {
  constructor() {}

  static forRoot(config: any): ModuleWithProviders<PlenaryConfigModule> {
    return {
      ngModule: PlenaryConfigModule,
      providers: [
        {
          provide: PLENARY_APP_CONFIG,
          useValue: config,
        },
      ],
    };
  }
}
