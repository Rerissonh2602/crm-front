import { NgModule } from '@angular/core';
import { NgIf } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SharedModule } from '../../../shared/shared.module';

import { PlenaryHeaderModule } from '@plenary/components/header/header.module';
import { PlenaryTableModule } from '@plenary/components/table';

import { menusRoutes } from './menus.routing';
import { MenusListComponent } from './components/menus-list/menus-list.component';
import { MenusFormComponent } from './components/menus-form/menus-form.component';
import { PrivilegesFormComponent } from './components/privileges-form/privileges-form.component';

@NgModule({
  declarations: [
    MenusListComponent,
    MenusFormComponent,
    PrivilegesFormComponent,
  ],
  imports: [
    RouterModule.forChild(menusRoutes),
    PlenaryHeaderModule,
    PlenaryTableModule,
    NgIf,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatSelectModule,
    MatTableModule,
    MatCheckboxModule,
    MatIconModule,
    MatInputModule,
    MatProgressSpinnerModule,
    SharedModule,
  ],
})
export class MenusModule {}
