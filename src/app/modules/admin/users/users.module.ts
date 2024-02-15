import { NgModule } from '@angular/core';
import { NgIf } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SharedModule } from '../../../shared/shared.module';

import { PlenaryHeaderModule } from '@plenary/components/header/header.module';
import { PlenaryTableModule } from '@plenary/components/table';

import { usersRoutes } from './users.routing';
import { UsersListComponent } from './components/users-list/users-list.component';
import { UsersFormComponent } from './components/users-form/users-form.component';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  declarations: [UsersListComponent, UsersFormComponent],
  imports: [
    RouterModule.forChild(usersRoutes),
    NgIf,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatSelectModule,
    MatIconModule,
    MatInputModule,
    MatProgressSpinnerModule,
    SharedModule,
    PlenaryHeaderModule,
    PlenaryTableModule,
  ],
})
export class UsersModule {}
