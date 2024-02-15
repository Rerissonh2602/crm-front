import { Route } from '@angular/router';

import { CompaniesListComponent } from './components/companies-list/companies-list.component';

export const companiesRoutes: Route[] = [
  {
    path: '',
    component: CompaniesListComponent,
    data: {
      title: 'Listar',
    },
  },
];
