import { Component } from '@angular/core';
import { QuestionnaireVersion } from '../../pages/questionnaire-management/@types/questionnaire';
import { AssessmentFormService } from '../assessment-form.service';
import { ActivatedRoute } from '@angular/router';
import { map, filter } from 'rxjs/operators';
import { combineLatest } from 'rxjs';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Answer } from '../@types/answer';
import { Question } from '../@types/question';
import { SkipLogic } from '../skip-logic';

@UntilDestroy()
@Component({
  selector: 'app-questionnaire-form',
  templateUrl: './questionnaire-form.component.html',
  styleUrls: ['./questionnaire-form.component.scss'],
})
export class QuestionnaireFormComponent {
  public questionnaire: QuestionnaireVersion;
  public answers: Answer[];
  public currentGroupIdx = 0;
  public skipLogic: Array<{ questionId: string; visible: boolean }> = [];

  constructor(private activtedRoute: ActivatedRoute, private assessmentFormService: AssessmentFormService) {
    combineLatest([
      this.activtedRoute.params.pipe(
        map((params) => +params?.questionnaireIndex),
        filter((idx) => !isNaN(idx))
      ),
      this.assessmentFormService.assessment$.pipe(filter((assessment) => !!assessment)),
    ])
      .pipe(untilDestroyed(this))
      .subscribe(([idx, assessment]) => {
        this.questionnaire = assessment?.questionnaireAssessment?.questionnaires?.[idx];
        this.answers = assessment?.questionnaireAssessment?.answers;
        this.assessmentFormService.setQuestionnaire(this.questionnaire);

        this.readSkipLogic(
          this.questionnaire.questionGroups[this.currentGroupIdx].questions,
          assessment.questionnaireAssessment.questionnaires
            .map((q) => q.questionGroups.map((g) => g.questions).flat())
            .flat(),
          this.answers
        );
      });
  }

  public isVisible(question: Question) {
    if (!question.relevant) return true;
    return this.skipLogic.find((logic) => logic.questionId === question._id)?.visible ?? true;
  }

  private readSkipLogic(currentQuestions: Question[], questions: Question[], answers: Answer[]) {
    this.skipLogic = currentQuestions
      .filter((q) => q.relevant)
      .map((q) => ({ questionId: q._id, visible: SkipLogic.create(q, questions, answers) }));
  }
}
