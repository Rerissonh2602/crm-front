import { NgModule } from '@angular/core';
import { NgIf } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SharedModule } from '../../../shared/shared.module';

import { PlenaryHeaderModule } from '@plenary/components/header/header.module';
import { PlenaryTableModule } from '@plenary/components/table';

import { leadsColumnsRoutes } from './leads-columns.routing';
import { LeadsColumnsListComponent } from './components/leads-columns-list/leads-columns-list.component';
import { LeadsColumnsFormComponent } from './components/leads-columns-form/leads-columns-form.component';

@NgModule({
  declarations: [LeadsColumnsListComponent, LeadsColumnsFormComponent],
  imports: [
    RouterModule.forChild(leadsColumnsRoutes),
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
export class LeadsColumnsModule {}
