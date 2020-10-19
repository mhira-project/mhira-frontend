import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { CoreModule } from '@core';
import { SharedModule } from '@shared';
import {
  NzAlertModule,
  NzButtonModule,
  NzCardModule,
  NzDrawerModule,
  NzGridModule,
  NzIconModule,
  NzInputModule,
  NzListModule,
  NzMessageModule,
  NzModalModule,
  NzTableModule,
  NzTabsModule,
  NzTagModule,
} from 'ng-zorro-antd';
import { NotFoundComponent } from './not-found/not-found.component';
import { NoTabsComponent } from './no-tabs/no-tabs.component';
import { MiscellaneousRoutingModule } from './miscellaneous-routing.module';
import { MiscellaneousComponent } from './miscellaneous.component';

const antModules = [
  NzGridModule,
  NzCardModule,
  NzTagModule,
  NzModalModule,
  NzButtonModule,
  NzTabsModule,
  NzMessageModule,
  NzAlertModule,
  NzListModule,
  NzInputModule,
  NzIconModule,
];

@NgModule({
  imports: [...antModules, CommonModule, TranslateModule, SharedModule, MiscellaneousRoutingModule],
  declarations: [MiscellaneousComponent, NotFoundComponent, NoTabsComponent],
  providers: [],
})
export class MiscellaneousModule {}
