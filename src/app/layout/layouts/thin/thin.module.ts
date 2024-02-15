import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';

import { PlenaryFullscreenModule } from '@plenary/components/fullscreen';
import { PlenaryLoadingBarModule } from '@plenary/components/loading-bar';
import { PlenaryNavigationModule } from '@plenary/components/navigation';

import { SharedModule } from '../../../shared/shared.module';
import { ThinLayoutComponent } from '../thin/thin.component';
import { UserModule } from '../../common/user/user.module';
import { NotificationsModule } from '../../common/notifications/notifications.module';

@NgModule({
  declarations: [ThinLayoutComponent],
  imports: [
    RouterModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    MatMenuModule,
    PlenaryFullscreenModule,
    PlenaryLoadingBarModule,
    PlenaryNavigationModule,
    NotificationsModule,
    UserModule,
    SharedModule,
  ],
  exports: [ThinLayoutComponent],
})
export class ThinLayoutModule {}
