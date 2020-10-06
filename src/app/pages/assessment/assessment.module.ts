import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { CoreModule } from '@core';
import { SharedModule } from '@shared';
import { AssessmentComponent } from './assessment.component';
import { AssessmentRoutingModule } from './assessment-routing.module';
import { PlanAssessmentComponent } from './plan-assessment/plan-assessment.component';
import { AssessmentsListComponent } from './assessments-list/assessments-list.component';
import { AssessmentService } from './@services/assessment.service';
import {
  NzAlertModule,
  NzButtonModule,
  NzCardModule,
  NzGridModule,
  NzIconModule,
  NzInputModule,
  NzListModule,
  NzMessageModule,
  NzModalModule,
  NzTabsModule,
  NzToolTipModule,
} from 'ng-zorro-antd';
import { PatientsService } from '../home/@services/patients.service';

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
];

@NgModule({
  imports: [...antModules, CommonModule, TranslateModule, SharedModule, AssessmentRoutingModule],
  declarations: [AssessmentComponent, PlanAssessmentComponent, AssessmentsListComponent],
  providers: [PatientsService, AssessmentService],
})
export class AssessmentModule {}
