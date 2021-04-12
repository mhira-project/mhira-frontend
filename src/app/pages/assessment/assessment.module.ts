import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { SharedModule } from '@shared';
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
  NzTagModule,
  NzToolTipModule,
} from 'ng-zorro-antd';
import { PatientsService } from '../patients-management/@services/patients.service';
import { AppFormModule } from '../../@shared/components/form/app-form.module';
import { MasterDataModule } from '../../@shared/@modules/master-data/master-data.module';
import { QuestionnaireSelectionComponent } from './questionnaire-selection/questionnaire-selection.component';
import { ComponentsModule } from '../../@shared/components/components.module';
import { ReactiveFormsModule } from '@angular/forms';

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
  NzTagModule,
];

@NgModule({
  imports: [
    ...antModules,
    CommonModule,
    AppFormModule,
    TranslateModule,
    SharedModule,
    AssessmentRoutingModule,
    MasterDataModule,
    ComponentsModule,
    ReactiveFormsModule,
    MasterDataModule,
  ],
  declarations: [PlanAssessmentComponent, AssessmentsListComponent, QuestionnaireSelectionComponent],
  providers: [PatientsService, AssessmentService],
})
export class AssessmentModule {}
