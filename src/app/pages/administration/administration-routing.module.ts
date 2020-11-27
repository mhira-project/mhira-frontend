import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { extract } from '../../i18n/index';
import { AdministrationComponent } from './administration.component';
import { UserManagementComponent } from './user-management/user-management.component';
import { RolesAndPermissionsComponent } from './roles-and-permissions/roles-and-permissions.component';
import { UserFormComponent } from './user-management/user-form/user-form.component';
import { PermissionsComponent } from './permissions/permissions.component';
import { RolesComponent } from './roles/roles.component';
import { DepartmentsComponent } from './departments/departments.component';
import { SettingsComponent } from './settings/settings.component';

const routes: Routes = [
  {
    path: '',
    component: AdministrationComponent,
    data: {
      title: extract('Administration'),
    },
    children: [
      {
        path: 'user-management',
        component: UserManagementComponent,
        data: {
          title: extract('User Management'),
        },
      },
      {
        path: 'user-management/form',
        component: UserFormComponent,
        data: {
          title: extract('Users Edit'),
        },
      },
      {
        path: 'roles-and-permissions',
        component: RolesAndPermissionsComponent,
        data: {
          title: extract('Roles & Permissions'),
        },
      },
      {
        path: 'roles',
        component: RolesComponent,
        data: {
          title: extract('Roles'),
        },
      },
      {
        path: 'settings',
        component: SettingsComponent,
        data: {
          title: extract('Settings'),
        },
      },
      {
        path: 'permissions',
        component: PermissionsComponent,
        data: {
          title: extract('Permissions'),
        },
      },
      {
        path: 'departments',
        component: DepartmentsComponent,
        data: {
          title: extract('Departments'),
        },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdministrationRoutingModule {}
