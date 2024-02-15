import { Route } from '@angular/router';

import { LeadsColumnsListComponent } from './components/leads-columns-list/leads-columns-list.component';

export const leadsColumnsRoutes: Route[] = [
  {
    path: '',
    component: LeadsColumnsListComponent,
    data: {
      title: 'Listar',
    },
  },
];
