import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { CoreModule } from '@core';
import { SharedModule } from '@shared';
import { AssessmentsComponent } from './assessments.component';
import { AssessmentsRoutingModule } from './assessments-routing.module';
import { PlanAssessmentComponent } from './plan-assessment/plan-assessment.component';
import { PlannedAssessmentComponent } from './planned-assessment/planned-assessment.component';

@NgModule({
  imports: [CommonModule, TranslateModule, SharedModule, AssessmentsRoutingModule],
  declarations: [AssessmentsComponent, PlanAssessmentComponent, PlannedAssessmentComponent],
})
export class AssessmentsModule {}
