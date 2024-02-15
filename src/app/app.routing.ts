import { Route } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { InitialDataResolver } from '../app/app.resolvers';

import { AuthGuard } from './core/auth/guards/auth.guard';
import { NoAuthGuard } from './core/auth/guards/no-auth.guard';
import { RoleGuard } from './core/auth/guards/role.guard';

export const appRoutes: Route[] = [
  { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
  { path: 'signed-in-redirect', pathMatch: 'full', redirectTo: 'dashboard' },
  // Authentication
  {
    path: '',
    canActivate: [NoAuthGuard],
    component: LayoutComponent,
    data: {
      layout: 'empty',
    },
    children: [
      {
        path: 'esqueci-minha-senha',
        loadChildren: () =>
          import(
            'app/modules/auth/forgot-password/forgot-password.module'
          ).then((m) => m.AuthForgotPasswordModule),
      },
      {
        path: 'redefinir-senha',
        loadChildren: () =>
          import('app/modules/auth/reset-password/reset-password.module').then(
            (m) => m.AuthResetPasswordModule
          ),
      },
      {
        path: 'login',
        loadChildren: () =>
          import('app/modules/auth/sign-in/sign-in.module').then(
            (m) => m.AuthSignInModule
          ),
      },
    ],
  },
  {
    path: '',
    canMatch: [AuthGuard],
    component: LayoutComponent,
    data: {
      layout: 'thin',
    },
    resolve: {
      initialData: InitialDataResolver,
    },
    children: [
      {
        path: 'dashboard',
        loadChildren: () =>
          import('app/modules/admin/home/home.module').then(
            (m) => m.HomeModule
          ),
      },
      {
        path: 'minha-conta',
        loadChildren: () =>
          import('app/modules/settings/settings.module').then(
            (m) => m.SettingsModule
          ),
      },
      {
        path: 'acoes',
        canMatch: [RoleGuard],
        data: {
          title: 'Ações',
          menuKey: 'ACTIONS',
        },
        loadChildren: () =>
          import('./modules/admin/actions/actions.module').then(
            (m) => m.ActionsModule
          ),
      },
      {
        path: 'empresas',
        canMatch: [RoleGuard],
        data: {
          title: 'Empresas',
          menuKey: 'COMPANIES',
        },
        loadChildren: () =>
          import('./modules/companies/companies.module').then(
            (m) => m.CompaniesModule
          ),
      },
      {
        path: 'funil-de-vendas',
        canMatch: [RoleGuard],
        data: {
          title: 'Funil de Vendas',
          menuKey: 'LEADS-COLUMNS',
        },
        loadChildren: () =>
          import('./modules/admin/leads-columns/leads-columns.module').then(
            (m) => m.LeadsColumnsModule
          ),
      },
      {
        path: 'grupos-de-menus',
        canMatch: [RoleGuard],
        data: {
          title: 'Grupos de Menus',
          menuKey: 'MENUS-GROUPS',
        },
        loadChildren: () =>
          import('./modules/admin/menus-groups/menus-groups.module').then(
            (m) => m.MenusGroupsModule
          ),
      },
      {
        path: 'perfis-de-acessos',
        canMatch: [RoleGuard],
        data: {
          title: 'Perfis de Acessos',
          menuKey: 'ROLES',
        },
        loadChildren: () =>
          import('./modules/admin/roles/roles.module').then(
            (m) => m.RolesModule
          ),
      },
      {
        path: 'permissoes',
        canMatch: [RoleGuard],
        data: {
          title: 'Permissões',
          menuKey: 'PRIVILEGES',
        },
        loadChildren: () =>
          import('./modules/admin/menus/menus.module').then(
            (m) => m.MenusModule
          ),
      },
      {
        path: 'usuarios',
        canMatch: [RoleGuard],
        data: {
          title: 'Usuários',
          menuKey: 'USERS',
        },
        loadChildren: () =>
          import('./modules/admin/users/users.module').then(
            (m) => m.UsersModule
          ),
      },
      {
        path: 'leads',
        canMatch: [RoleGuard],
        data: {
          title: 'Leads',
          menuKey: 'LEADS',
        },
        loadChildren: () =>
          import('./modules/leads/leads.module').then((m) => m.LeadsModule),
      },
    ],
  },
];
