import { NgModule } from '@angular/core';
import { NgIf } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SharedModule } from '../../shared/shared.module';

import { PlenaryHeaderModule } from '@plenary/components/header/header.module';
import { PlenaryTableModule } from '@plenary/components/table';

import { companiesRoutes } from './companies.routing';
import { CompaniesListComponent } from './components/companies-list/companies-list.component';
import { CompaniesFormComponent } from './components/companies-form/companies-form.component';

@NgModule({
  declarations: [CompaniesListComponent, CompaniesFormComponent],
  imports: [
    RouterModule.forChild(companiesRoutes),
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
export class CompaniesModule {}
