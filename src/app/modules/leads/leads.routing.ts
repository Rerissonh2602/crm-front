import { Route } from '@angular/router';

import { LeadsListComponent } from './components/leads-list/leads-list.component';

export const leadsRoutes: Route[] = [
  {
    path: '',
    component: LeadsListComponent,
    data: {
      title: 'Listar',
    },
  },
];
