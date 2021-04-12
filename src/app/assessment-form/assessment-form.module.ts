import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AssessmentFormRoutingModule } from './assessment-form-routing.module';
import { AssessmentOverviewComponent } from './assessment-overview/assessment-overview.component';
import { NzCardModule, NzToolTipModule, NzIconModule, NzButtonModule } from 'ng-zorro-antd';
import { QuestionnaireInfoComponent } from './questionnaire-info/questionnaire-info.component';
import { QuestionnaireFormComponent } from './questionnaire-form/questionnaire-form.component';
import { AssessmentFormService } from './assessment-form.service';
import { AssessmentFormComponent } from './assessment-form.component';

@NgModule({
  declarations: [
    AssessmentOverviewComponent,
    QuestionnaireInfoComponent,
    QuestionnaireFormComponent,
    AssessmentFormComponent,
  ],
  imports: [CommonModule, AssessmentFormRoutingModule, NzCardModule, NzToolTipModule, NzIconModule, NzButtonModule],
  providers: [AssessmentFormService],
})
export class AssessmentFormModule {}
