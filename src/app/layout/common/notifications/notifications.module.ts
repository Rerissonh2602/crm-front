import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatBadgeModule } from '@angular/material/badge';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { RouterLink } from '@angular/router';

import { NotificationsComponent } from './notifications.component';
import { SharedModule } from '../../../shared/shared.module';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
  declarations: [NotificationsComponent],
  imports: [
    MatButtonModule,
    MatDividerModule,
    MatBadgeModule,
    MatIconModule,
    MatMenuModule,
    MatTooltipModule,
    SharedModule,
    RouterLink,
  ],
  exports: [NotificationsComponent],
})
export class NotificationsModule {}
