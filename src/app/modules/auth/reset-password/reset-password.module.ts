import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { PlenaryCardModule } from '@plenary/components/card';
import { PlenaryAlertModule } from '@plenary/components/alert';

import { SharedModule } from 'app/shared/shared.module';
import { AuthResetPasswordComponent } from 'app/modules/auth/reset-password/reset-password.component';
import { authResetPasswordRoutes } from 'app/modules/auth/reset-password/reset-password.routing';

@NgModule({
  declarations: [AuthResetPasswordComponent],
  imports: [
    RouterModule.forChild(authResetPasswordRoutes),
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatProgressSpinnerModule,
    PlenaryCardModule,
    PlenaryAlertModule,
    SharedModule,
  ],
})
export class AuthResetPasswordModule {}
