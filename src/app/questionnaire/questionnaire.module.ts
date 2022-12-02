import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import {
  NzAlertModule,
  NzButtonModule,
  NzFormModule,
  NzGridModule,
  NzInputModule,
  NzLayoutModule,
  NzCardModule,
  NzIconModule,
  NzToolTipModule,
  NzInputNumberModule,
  NzDatePickerModule,
} from 'ng-zorro-antd';
import { QuestionnairesListComponent } from './questionnaires-list/questionnaires-list.component';
import { QuestionnaireRoutingModule } from './questionnaire-routing.module';
import { QuestionComponent } from './question/question.component';
import { DoAssessmentComponent } from './do-assessment/do-assessment.component';
import { TextQuestionComponent } from './question/question-types/text-question/text-question.component';
import { NumberQuestionComponent } from './question/question-types/number-question/number-question.component';
import { ChoiceQuestionComponent } from './question/question-types/choice-question/choice-question.component';
import { CheckboxQuestionComponent } from './question/question-types/checkbox-question/checkbox-question.component';
import { TimeQuestionComponent } from './question/question-types/time-question/time-question.component';
import { DateQuestionComponent } from './question/question-types/date-question/date-question.component';

const antModules = [
  NzFormModule,
  NzAlertModule,
  NzLayoutModule,
  NzInputModule,
  NzButtonModule,
  NzGridModule,
  NzCardModule,
  NzIconModule,
  NzToolTipModule,
  NzInputNumberModule,
  NzDatePickerModule,
];

@NgModule({
  imports: [...antModules, CommonModule, FormsModule, ReactiveFormsModule, TranslateModule, QuestionnaireRoutingModule],
  declarations: [
    QuestionnairesListComponent,
    QuestionComponent,
    DoAssessmentComponent,
    TextQuestionComponent,
    NumberQuestionComponent,
    ChoiceQuestionComponent,
    CheckboxQuestionComponent,
    TimeQuestionComponent,
    DateQuestionComponent,
  ],
})
export class QuestionnaireModule {}
