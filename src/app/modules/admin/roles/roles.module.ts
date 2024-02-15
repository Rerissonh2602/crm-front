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

import { rolesRoutes } from './roles.routing';
import { RolesListComponent } from './components/roles-list/roles-list.component';
import { RolesFormComponent } from './components/roles-form/roles-form.component';

@NgModule({
  declarations: [RolesListComponent, RolesFormComponent],
  imports: [
    RouterModule.forChild(rolesRoutes),
    NgIf,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatProgressSpinnerModule,
    SharedModule,
    PlenaryHeaderModule,
    PlenaryTableModule,
  ],
})
export class RolesModule {}
