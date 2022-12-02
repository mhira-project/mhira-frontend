import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { extract } from '@app/i18n';
import { LoginComponent } from './login/login.component';
import { ChangePasswordComponent } from '@app/auth/change-password/change-password.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    data: {
      title: extract('Login'),
    },
  },
  {
    path: 'change-password',
    component: ChangePasswordComponent,
    data: {
      title: extract('Change password'),
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [],
})
export class AuthRoutingModule {}
