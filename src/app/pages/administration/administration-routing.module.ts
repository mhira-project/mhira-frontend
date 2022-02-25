import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RolesAndPermissionsComponent } from './roles-and-permissions/roles-and-permissions.component';
import { PermissionsComponent } from './permissions/permissions.component';
import { RolesComponent } from './roles/roles.component';
import { DepartmentsComponent } from './departments/departments.component';
import { PermissionKey } from '@app/@shared/@types/permission';
import { PermissionGuard } from '../../permission.guard';
import { ReportsComponent } from './reports/reports.component';
import { CreateReportComponent } from './create-report/create-report.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'reports',
        component: ReportsComponent,
        data: {
          breadcrumbI18nKey: 'menu.reports',
          permissions: {
            only: [PermissionKey.VIEW_REPORTS],
          },
        },
        canActivate: [PermissionGuard],
      },
      {
        path: 'create-report',
        component: CreateReportComponent,
        data: {
          breadcrumbI18nKey: 'menu.createReport',
          permissions: {
            only: [PermissionKey.VIEW_REPORTS],
          },
        },
        canActivate: [PermissionGuard],
      },
      {
        path: 'permission-matrix',
        component: RolesAndPermissionsComponent,
        data: {
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
          breadcrumbI18nKey: 'menu.settings',
        },
        loadChildren: () => import('./settings/settings.module').then((m) => m.SettingsModule),
      },
      {
        path: 'permissions',
        component: PermissionsComponent,
        data: {
          breadcrumbI18nKey: 'menu.permissions',
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
