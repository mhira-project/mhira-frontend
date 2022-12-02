import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { I18nModule } from '@app/i18n';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';

import { ChangePasswordComponent } from '@app/auth/change-password/change-password.component';

const antModules = [NzFormModule, NzAlertModule, NzLayoutModule, NzInputModule, NzButtonModule];

@NgModule({
  imports: [
    ...antModules,
    CommonModule,
    ReactiveFormsModule,
    TranslateModule,
    NgbModule,
    I18nModule,
    AuthRoutingModule,
    NzIconModule,
  ],
  declarations: [LoginComponent, ChangePasswordComponent],
})
export class AuthModule {}
