import { FullAssessment } from './../../pages/assessment/@types/assessment';
import { Component } from '@angular/core';
import { QuestionnaireVersion } from '../../pages/questionnaire-management/@types/questionnaire';
import { AssessmentFormService } from '../assessment-form.service';

@Component({
  selector: 'app-assessment-overview',
  templateUrl: './assessment-overview.component.html',
  styleUrls: ['./assessment-overview.component.scss'],
})
export class AssessmentOverviewComponent {
  constructor(public assessmentFormService: AssessmentFormService) {}

  public countQuestions(questionnaire: QuestionnaireVersion) {
    return questionnaire.questionGroups.reduce((sum, group) => (sum += group.questions.length), 0);
  }

  public countAnswersOfQuestionnaire(questionnaire: QuestionnaireVersion, assessment: FullAssessment) {
    const questions = questionnaire.questionGroups.map((qg) => qg.questions.map((q) => q._id)).flat();
    return assessment.questionnaireAssessment.answers.reduce(
      (sum: number, answer) => (sum += questions.includes(answer.question) ? 1 : 0),
      0
    );
  }

  public isQuestionnaireDone(questionnaire: QuestionnaireVersion, assessment: FullAssessment): boolean {
    if (!questionnaire) return false;
    return this.countQuestions(questionnaire) === this.countAnswersOfQuestionnaire(questionnaire, assessment);
  }

  public canAccessQuestionnaire(index: number, assessment: FullAssessment): boolean {
    if (index === 0) return true;
    const questionnaire = assessment.questionnaireAssessment.questionnaires?.[index - 1];
    return this.isQuestionnaireDone(questionnaire, assessment);
  }
}
