import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { extract } from '../../i18n/index';
import { RolesAndPermissionsComponent } from './roles-and-permissions/roles-and-permissions.component';
import { PermissionsComponent } from './permissions/permissions.component';
import { RolesComponent } from './roles/roles.component';
import { DepartmentsComponent } from './departments/departments.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: extract('Administration'),
    },
    children: [
      {
        path: 'roles-and-permissions',
        component: RolesAndPermissionsComponent,
        data: {
          title: extract('Roles & Permissions'),
          breadcrumb: extract('Roles & Permissions'),
        },
      },
      {
        path: 'roles',
        component: RolesComponent,
        data: {
          title: extract('Roles'),
          breadcrumb: extract('Roles'),
        },
      },
      {
        path: 'settings',
        data: {
          title: extract('Settings'),
          breadcrumb: extract('Settings'),
        },
        loadChildren: () => import('./settings/settings.module').then((m) => m.SettingsModule),
      },
      {
        path: 'permissions',
        component: PermissionsComponent,
        data: {
          title: extract('Permissions'),
          breadcrumb: extract('Permissions'),
        },
      },
      {
        path: 'departments',
        component: DepartmentsComponent,
        data: {
          title: extract('Departments'),
          breadcrumb: extract('Departments'),
        },
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'roles',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdministrationRoutingModule {}
