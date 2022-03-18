import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { TranslateModule } from '@ngx-translate/core';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { ReportsComponent } from './reports/reports.component';

@NgModule({
  declarations: [DashboardComponent, ReportsComponent],
  imports: [CommonModule, DashboardRoutingModule, TranslateModule.forChild(), NzTabsModule],
})
export class DashboardModule {}
