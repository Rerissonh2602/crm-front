import { Route } from '@angular/router';

import { MenusListComponent } from './components/menus-list/menus-list.component';

export const menusRoutes: Route[] = [
  {
    path: '',
    component: MenusListComponent,
    data: {
      title: 'Listar',
    },
  },
];
