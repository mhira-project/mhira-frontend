import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { I18nModule } from '@app/i18n';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { NzAlertModule, NzButtonModule, NzFormModule, NzInputModule, NzLayoutModule } from 'ng-zorro-antd';
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
  ],
  declarations: [LoginComponent, ChangePasswordComponent],
})
export class AuthModule {}
