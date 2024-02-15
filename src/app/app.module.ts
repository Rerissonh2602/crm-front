import { NgModule } from '@angular/core';
import { ExtraOptions, PreloadAllModules, RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SocketIoModule } from 'ngx-socket-io';

// Core Modules
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { LayoutModule } from './layout/layout.module';

// Libs Modules
import { PlenaryModule } from '@plenary/plenary.module';
import { PlenaryConfigModule } from '@plenary/services/config';
import { PlenaryToastModule } from '@plenary/components/toast';

// Configs
import { appConfig } from './core/config/app.config';
import { appRoutes } from './app.routing';

const routerConfig: ExtraOptions = {
  preloadingStrategy: PreloadAllModules,
  scrollPositionRestoration: 'enabled',
};

@NgModule({
  imports: [
    BrowserModule,
    CoreModule,
    PlenaryToastModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes, routerConfig),
    PlenaryModule,
    PlenaryConfigModule.forRoot(appConfig),
    LayoutModule,
    SocketIoModule,
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
