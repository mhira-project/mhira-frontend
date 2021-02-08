import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { extract } from '../../i18n/index';
import { UsersListComponent } from './users-list/users-list.component';
import { UserFormComponent } from './user-form/user-form.component';

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
        },
      },
      {
        path: 'user-form',
        component: UserFormComponent,
        data: {
          title: extract('Users Edit'),
          breadcrumb: extract('Edit User'),
        },
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
