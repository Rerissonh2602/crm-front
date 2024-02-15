import { Route } from '@angular/router';

import { MenusGroupsListComponent } from './components/menus-groups-list/menus-groups-list.component';

export const menusGroupsRoutes: Route[] = [
  {
    path: '',
    component: MenusGroupsListComponent,
    data: {
      title: 'Listar',
    },
  },
];
