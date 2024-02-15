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

import { menusGroupsRoutes } from './menus-groups.routing';
import { MenusGroupsListComponent } from './components/menus-groups-list/menus-groups-list.component';
import { MenusGroupsFormComponent } from './components/menus-groups-form/menus-groups-form.component';

@NgModule({
  declarations: [MenusGroupsListComponent, MenusGroupsFormComponent],
  imports: [
    RouterModule.forChild(menusGroupsRoutes),
    PlenaryHeaderModule,
    PlenaryTableModule,
    NgIf,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatProgressSpinnerModule,
    SharedModule,
  ],
})
export class MenusGroupsModule {}
