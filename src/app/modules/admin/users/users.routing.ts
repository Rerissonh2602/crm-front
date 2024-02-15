import { Route } from '@angular/router';

import { UsersListComponent } from './components/users-list/users-list.component';

export const usersRoutes: Route[] = [
  {
    path: '',
    component: UsersListComponent,
    data: {
      title: 'Listar',
    },
  },
];
