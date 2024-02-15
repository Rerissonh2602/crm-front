import { LOCALE_ID, NgModule } from '@angular/core';
import { CurrencyPipe, NgIf } from '@angular/common';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MAT_LUXON_DATE_FORMATS, MatLuxonDateModule } from '@angular/material-luxon-adapter';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDividerModule } from '@angular/material/divider';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { SharedModule } from '../../shared/shared.module';

import { PlenaryFindByKeyPipeModule } from '@plenary/pipes/find-by-key';
import { CurrencyDirective, PhoneMaskDirective } from '@plenary/directives';
import { PlenaryHeaderModule } from '@plenary/components/header';
import { PlenaryItemListModule } from '@plenary/components/item-list';
import { PlenaryTableModule } from '@plenary/components/table';

import { leadsRoutes } from './leads.routing';
import { LeadsListComponent } from './components/leads-list/leads-list.component';
import { LeadsFormComponent } from './components/leads-form/leads-form.component';
import { LeadsWinComponent } from './components/leads-win/leads-win.component';
import { LeadsLostComponent } from './components/leads-lost/leads-lost.component';
import { LeadsArchivedComponent } from './components/leads-archived/leads-archived.component';
import { LeadsAddListComponent } from './components/leads-add-list/leads-add-list.component';
import { LeadsAddCardComponent } from './components/leads-add-card/leads-add-card.component';

import { registerLocaleData } from '@angular/common';
import localePT from '@angular/common/locales/pt';

registerLocaleData(localePT);

@NgModule({
  declarations: [
    LeadsListComponent,
    LeadsFormComponent,
    LeadsWinComponent,
    LeadsLostComponent,
    LeadsArchivedComponent,
    LeadsAddListComponent,
    LeadsAddCardComponent,
    PhoneMaskDirective,
  ],
  imports: [
    RouterModule.forChild(leadsRoutes),
    PlenaryItemListModule,
    PlenaryHeaderModule,
    PlenaryTableModule,
    NgIf,
    MatButtonModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatDialogModule,
    MatFormFieldModule,
    MatTooltipModule,
    MatIconModule,
    MatDividerModule,
    MatInputModule,
    MatLuxonDateModule,
    MatMenuModule,
    MatProgressBarModule,
    SharedModule,
    DragDropModule,
    MatProgressSpinnerModule,
    MatDatepickerModule,
    PlenaryFindByKeyPipeModule,
  ],
  providers: [
    CurrencyPipe,
    {
      provide: MAT_DATE_FORMATS,
      useValue: MAT_LUXON_DATE_FORMATS,
    },
    { provide: LOCALE_ID, useValue: 'pt-br' },
  ],
})
export class LeadsModule {}
