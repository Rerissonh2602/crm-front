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

import { actionsRoutes } from './actions.routing';
import { ActionsListComponent } from './components/actions-list/actions-list.component';
import { ActionsFormComponent } from './components/actions-form/actions-form.component';

@NgModule({
  declarations: [ActionsListComponent, ActionsFormComponent],
  imports: [
    RouterModule.forChild(actionsRoutes),
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
export class ActionsModule {}
