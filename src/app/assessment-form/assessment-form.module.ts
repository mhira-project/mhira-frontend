import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AssessmentFormRoutingModule } from './assessment-form-routing.module';
import { AssessmentOverviewComponent } from './assessment-overview/assessment-overview.component';
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
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzTimePickerModule } from 'ng-zorro-antd/time-picker';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzFormModule } from 'ng-zorro-antd/form';
import { TranslateModule } from '@ngx-translate/core';

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
    NzFormModule,
    TranslateModule,
  ],
  providers: [AssessmentFormService],
})
export class AssessmentFormModule {}
