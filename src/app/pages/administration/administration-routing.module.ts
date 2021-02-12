import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { extract } from '../../i18n/index';
import { RolesAndPermissionsComponent } from './roles-and-permissions/roles-and-permissions.component';
import { PermissionsComponent } from './permissions/permissions.component';
import { RolesComponent } from './roles/roles.component';
import { DepartmentsComponent } from './departments/departments.component';
import { PermissionKey } from '@app/@shared/@types/permission';
import { PermissionGuard } from '../../permission.guard';

const routes: Routes = [
  {
    path: '',
    data: {
      title: extract('Administration'),
    },
    children: [
      {
        path: 'permission-matrix',
        component: RolesAndPermissionsComponent,
        data: {
          title: extract('Permission Matrix'),
          breadcrumb: extract('Permission Matrix'),
          permissions: {
            only: [PermissionKey.MANAGE_ROLES],
          },
        },
        canActivate: [PermissionGuard],
      },
      {
        path: 'roles',
        component: RolesComponent,
        data: {
          title: extract('Roles'),
          breadcrumb: extract('Roles'),
          permissions: {
            only: [PermissionKey.VIEW_ROLES],
          },
        },
        canActivate: [PermissionGuard],
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
          permissions: {
            only: [PermissionKey.VIEW_ROLES],
          },
        },
        canActivate: [PermissionGuard],
      },
      {
        path: 'departments',
        component: DepartmentsComponent,
        data: {
          title: extract('Departments'),
          breadcrumb: extract('Departments'),
          permissions: {
            only: [PermissionKey.VIEW_DEPARTMENTS],
          },
        },
        canActivate: [PermissionGuard],
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
