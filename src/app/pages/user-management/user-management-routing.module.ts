import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsersListComponent } from './users-list/users-list.component';
import { UserFormComponent } from './user-form/user-form.component';
import { PermissionKey } from '@app/@shared/@types/permission';
import { PermissionGuard } from '../../permission.guard';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'users',
        component: UsersListComponent,
        data: {
          breadcrumbI18nKey: 'menu.userManagement',
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
          breadcrumbI18nKey: 'menu.newUser',
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
