import { Route } from '@angular/router';

import { RolesListComponent } from './components/roles-list/roles-list.component';
export const rolesRoutes: Route[] = [
  {
    path: '',
    component: RolesListComponent,
    data: {
      title: 'Listar',
    },
  },
];
