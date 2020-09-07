import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { CoreModule } from '@core';
import { SharedModule } from '@shared';
import { ReportsComponent } from './reports.component';
import { ReportsRoutingModule } from './reports-routing.module';

@NgModule({
  imports: [CommonModule, TranslateModule, SharedModule, ReportsRoutingModule],
  declarations: [ReportsComponent],
})
export class ReportsModule {}
