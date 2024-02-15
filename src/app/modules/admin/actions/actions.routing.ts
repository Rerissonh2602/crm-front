import { Route } from '@angular/router';

import { ActionsListComponent } from './components/actions-list/actions-list.component';

export const actionsRoutes: Route[] = [
  {
    path: '',
    component: ActionsListComponent,
    data: {
      title: 'Listar',
    },
  },
];
