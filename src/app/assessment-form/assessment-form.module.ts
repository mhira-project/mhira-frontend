import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AssessmentFormRoutingModule } from './assessment-form-routing.module';
import { AssessmentOverviewComponent } from './assessment-overview/assessment-overview.component';
import {
  NzCardModule,
  NzToolTipModule,
  NzIconModule,
  NzButtonModule,
  NzRadioModule,
  NzInputModule,
  NzCheckboxModule,
  NzInputNumberModule,
  NzTagModule,
  NzDatePickerModule,
  NzTimePickerModule,
} from 'ng-zorro-antd';
import { QuestionnaireInfoComponent } from './questionnaire-info/questionnaire-info.component';
import { QuestionnaireFormComponent } from './questionnaire-form/questionnaire-form.component';
import { AssessmentFormService } from './assessment-form.service';
import { AssessmentFormComponent } from './assessment-form.component';
import { QuestionComponent } from './question/question.component';
import { FormsModule } from '@angular/forms';
import { SelectQuestionComponent } from './question/question-type/select-question/select-question.component';
import { QuestionBaseComponent } from './@types/question';
import { MultiselectQuestionComponent } from './question/question-type/multiselect-question/multiselect-question.component';
import { NgxInputSearchModule } from 'ngx-input-search';

@NgModule({
  declarations: [
    AssessmentOverviewComponent,
    QuestionnaireInfoComponent,
    QuestionnaireFormComponent,
    AssessmentFormComponent,
    QuestionComponent,
    QuestionBaseComponent,
    SelectQuestionComponent,
    MultiselectQuestionComponent,
  ],
  imports: [
    CommonModule,
    AssessmentFormRoutingModule,
    FormsModule,
    NzCardModule,
    NzToolTipModule,
    NzIconModule,
    NzButtonModule,
    NzRadioModule,
    NzInputModule,
    NzCheckboxModule,
    NzInputNumberModule,
    NzTagModule,
    NzDatePickerModule,
    NzTimePickerModule,
    NgxInputSearchModule,
  ],
  providers: [AssessmentFormService],
})
export class AssessmentFormModule {}
