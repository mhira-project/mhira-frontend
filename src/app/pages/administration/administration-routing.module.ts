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
          breadcrumbI18nKey: 'menu.permissionMatrix',
          permissions: {
            only: [PermissionKey.VIEW_ROLES_PERMISSIONS],
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
          breadcrumbI18nKey: 'menu.roles',
          permissions: {
            only: [PermissionKey.VIEW_ROLES_PERMISSIONS],
          },
        },
        canActivate: [PermissionGuard],
      },
      {
        path: 'settings',
        data: {
          title: extract('Settings'),
          breadcrumbI18nKey: 'menu.settings',
          breadcrumb: extract('Settings'),
        },
        loadChildren: () => import('./settings/settings.module').then((m) => m.SettingsModule),
      },
      {
        path: 'permissions',
        component: PermissionsComponent,
        data: {
          title: extract('Permissions'),
          breadcrumbI18nKey: 'menu.permissions',
          breadcrumb: extract('Permissions'),
          permissions: {
            only: [PermissionKey.VIEW_ROLES_PERMISSIONS],
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
          breadcrumbI18nKey: 'menu.departments',
          permissions: {
            only: [PermissionKey.VIEW_SETTINGS],
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
