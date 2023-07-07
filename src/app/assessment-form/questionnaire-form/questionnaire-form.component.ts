import { Component, HostListener } from '@angular/core';
import { QuestionnaireVersion } from '../../pages/questionnaire-management/@types/questionnaire';
import { AssessmentFormService } from '../assessment-form.service';
import { ActivatedRoute } from '@angular/router';
import { map, filter } from 'rxjs/operators';
import { combineLatest } from 'rxjs';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Answer } from '../@types/answer';
import { Question } from '../@types/question';
import { SkipLogic } from '../skip-logic';
import { ErrorHandlerService } from '../../@shared/services/error-handler.service';
import { MhiraTranslations } from '../../@core/mhira-translations';

@UntilDestroy()
@Component({
  selector: 'app-questionnaire-form',
  templateUrl: './questionnaire-form.component.html',
  styleUrls: ['./questionnaire-form.component.scss'],
})
export class QuestionnaireFormComponent {
  public questionnaire: any;
  public answers: Answer[];
  public skipLogic: Array<{ questionId: string; visible: boolean }> = [];
  public mapped: any = {};

  public set currentGroupIdx(idx: number) {
    this._currentGroupIdx = idx;
    this.readSkipLogic();
  }
  public get currentGroupIdx() {
    return this._currentGroupIdx;
  }

  private _currentGroupIdx = 0;

  constructor(
    private activtedRoute: ActivatedRoute,
    private assessmentFormService: AssessmentFormService,
    private errorService: ErrorHandlerService,
    public translations: MhiraTranslations
  ) {
    combineLatest([
      this.activtedRoute.params.pipe(
        map((params) => +params?.questionnaireIndex),
        filter((idx) => !isNaN(idx))
      ),
      this.assessmentFormService.assessment$.pipe(filter((assessment) => !!assessment)),
    ])
      .pipe(untilDestroyed(this))
      .subscribe(([idx, newAssessment]) => {
        this.questionnaire = newAssessment?.questionnaireAssessment?.questionnaires?.[idx];
        this.answers = newAssessment?.questionnaireAssessment?.answers;
        this.answers.forEach(item => {
          const questionKey = item.question;
          this.mapped[questionKey] = item.textValue;
        });
        this.assessmentFormService.setQuestionnaire(this.questionnaire);
        this.readSkipLogic();
      });
  }

  @HostListener('click')
  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  public isVisible(question: Question) {
    if (!question.relevant) return true;
    return this.skipLogic.find((logic) => logic.questionId === question._id)?.visible ?? true;
  }

  addAnswer(questionId: string, value: string){
    value = value.toString();
    this.assessmentFormService.addAnswer({question: questionId, textValue: value}).subscribe()
  }

  private readSkipLogic() {
    const assessment = this.assessmentFormService.assessmentSnapshot;
    const currentQuestions = this.questionnaire.questionGroups[this.currentGroupIdx].questions;
    const questions = assessment.questionnaireAssessment.questionnaires
      .map((q) => q.questionGroups.map((g) => g.questions).flat())
      .flat();

    this.skipLogic = currentQuestions
      .filter((q: { relevant: any; }) => q.relevant)
      .map((q: Question) => {
        let visible = true;
        try {
          visible = SkipLogic.create(q, questions, this.answers);
        } catch (err) {
          this.errorService.handleError(err, {
            prefix: `Unable to create skip logic of "${q.relevant}" for "${q.name}"`,
          });
        }
        return { questionId: q._id, visible };
      });
  }
}
