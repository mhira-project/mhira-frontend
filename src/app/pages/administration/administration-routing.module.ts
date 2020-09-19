import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { extract } from '../../i18n/index';
import { AdministrationComponent } from './administration.component';
import { UserManagementComponent } from './user-management/user-management.component';
import { RolesAndPermissionsComponent } from './roles-and-permissions/roles-and-permissions.component';
import { UserFormComponent } from './user-management/user-form/user-form.component';

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
        path: 'user-management/form/:id',
        component: UserFormComponent,
        data: {
          title: extract('New User'),
        },
      },
      {
        path: 'roles-and-permissions',
        component: RolesAndPermissionsComponent,
        data: {
          title: extract('Roles & Permissions'),
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
