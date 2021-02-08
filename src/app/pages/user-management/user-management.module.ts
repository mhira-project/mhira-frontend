import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { SharedModule } from '@shared';
import { UserManagementRoutingModule } from './user-management-routing.module';
import { UsersListComponent } from './users-list/users-list.component';
import {
  NzAlertModule,
  NzButtonModule,
  NzCardModule,
  NzCheckboxModule,
  NzDrawerModule,
  NzGridModule,
  NzIconModule,
  NzInputModule,
  NzListModule,
  NzMessageModule,
  NzModalModule,
  NzSpinModule,
  NzSwitchModule,
  NzTableModule,
  NzTabsModule,
  NzToolTipModule,
} from 'ng-zorro-antd';
import { UserFormComponent } from './user-form/user-form.component';
import { FormsModule } from '@angular/forms';
import { AppFormModule } from '../../@shared/components/form/app-form.module';

const antModules = [
  NzGridModule,
  NzCardModule,
  NzModalModule,
  NzButtonModule,
  NzTabsModule,
  NzMessageModule,
  NzAlertModule,
  NzListModule,
  NzInputModule,
  NzIconModule,
  NzToolTipModule,
  NzModalModule,
  NzTabsModule,
  NzGridModule,
  NzDrawerModule,
  NzTableModule,
  NzCheckboxModule,
  NzSpinModule,
];

@NgModule({
  imports: [
    ...antModules,
    FormsModule,
    CommonModule,
    AppFormModule,
    TranslateModule,
    SharedModule,
    UserManagementRoutingModule,
    NzSwitchModule,
  ],
  declarations: [UsersListComponent, UserFormComponent],
})
export class UserManagementModule {}
