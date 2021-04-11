import { FullAssessment } from './../../pages/assessment/@types/assessment';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, filter, first } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { QuestionnaireVersion } from '../../pages/questionnaire-management/@types/questionnaire';

@Component({
  selector: 'app-assessment-overview',
  templateUrl: './assessment-overview.component.html',
  styleUrls: ['./assessment-overview.component.scss'],
})
export class AssessmentOverviewComponent {
  public assessment$: Observable<FullAssessment>;

  constructor(private activatedRoute: ActivatedRoute) {
    this.assessment$ = this.activatedRoute.data.pipe(
      map((data) => data.assessment),
      filter((assessment) => !!assessment),
      first()
    );
  }

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
}
