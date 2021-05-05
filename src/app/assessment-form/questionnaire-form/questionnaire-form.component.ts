import { Component } from '@angular/core';
import { QuestionnaireVersion } from '../../pages/questionnaire-management/@types/questionnaire';
import { AssessmentFormService } from '../assessment-form.service';
import { ActivatedRoute } from '@angular/router';
import { map, filter } from 'rxjs/operators';
import { combineLatest } from 'rxjs';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Answer } from '../@types/answer';
import { Question } from '../@types/question';
import { questions } from '../../questionnaire/do-assessment/data';
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

  private readSkipLogic(currentQuestions: Question[], questions: Question[], answers: Answer[]) {
    console.log('cur', currentQuestions);
    console.log('all', questions);
    console.log('ans', answers);

    for (const question of currentQuestions.filter((q) => q.relevant)) {
      SkipLogic.create(question, questions, answers);
    }
  }
}
