import { NgModule } from '@angular/core';
import { PlenarySplashScreenService } from '@plenary/services/splash-screen/splash-screen.service';

@NgModule({
  providers: [PlenarySplashScreenService],
})
export class PlenarySplashScreenModule {
  constructor(
    private readonly _plenarySplashScreenService: PlenarySplashScreenService
  ) {}
}
