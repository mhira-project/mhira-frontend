import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { CoreModule } from '@core';
import { SharedModule } from '@shared';
import { AdministrationComponent } from './administration.component';
import { AdministrationRoutingModule } from './administration-routing.module';
import { UserManagementComponent } from './user-management/user-management.component';
import { RolesAndPermissionsComponent } from './roles-and-permissions/roles-and-permissions.component';
import { NzModalModule } from 'ng-zorro-antd';

@NgModule({
  imports: [CommonModule, TranslateModule, SharedModule, AdministrationRoutingModule, NzModalModule],
  declarations: [AdministrationComponent, UserManagementComponent, RolesAndPermissionsComponent],
})
export class AdministrationModule {}
