import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { extract } from '../../i18n/index';
import { UsersListComponent } from './users-list/users-list.component';
import { UserFormComponent } from './user-form/user-form.component';
import { PermissionKey } from '@app/@shared/@types/permission';
import { PermissionGuard } from '../../permission.guard';

const routes: Routes = [
  {
    path: '',
    data: {
      title: extract('User Management'),
    },
    children: [
      {
        path: 'users',
        component: UsersListComponent,
        data: {
          title: extract('User Management'),
          breadcrumb: extract('Users'),
          permissions: {
            only: [PermissionKey.VIEW_USERS],
          },
        },
        canActivate: [PermissionGuard],
      },
      {
        path: 'user-form',
        component: UserFormComponent,
        data: {
          title: extract('Users Edit'),
          breadcrumb: extract('Edit User'),
          permissions: {
            only: [PermissionKey.VIEW_USERS],
          },
        },
        canActivate: [PermissionGuard],
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'users',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserManagementRoutingModule {}
