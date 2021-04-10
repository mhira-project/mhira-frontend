import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AssessmentFormRoutingModule } from './assessment-form-routing.module';
import { AssessmentOverviewComponent } from './assessment-overview/assessment-overview.component';
import { NzCardModule, NzToolTipModule, NzIconModule } from 'ng-zorro-antd';
import { QuestionnaireInfoComponent } from './questionnaire-info/questionnaire-info.component';

@NgModule({
  declarations: [AssessmentOverviewComponent, QuestionnaireInfoComponent],
  imports: [CommonModule, AssessmentFormRoutingModule, NzCardModule, NzToolTipModule, NzIconModule],
})
export class AssessmentFormModule {}
