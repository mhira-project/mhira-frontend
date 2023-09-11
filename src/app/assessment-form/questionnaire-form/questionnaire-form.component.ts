import { Component } from '@angular/core';
import { QuestionnaireVersion } from '../../pages/questionnaire-management/@types/questionnaire';
import { AssessmentFormService } from '../assessment-form.service';
import { ActivatedRoute, Router } from '@angular/router';
import { map, filter } from 'rxjs/operators';
import { combineLatest } from 'rxjs';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Answer } from '../@types/answer';
import { Question } from '../@types/question';
import { SkipLogic } from '../skip-logic';
import { ErrorHandlerService } from '../../@shared/services/error-handler.service';
import { MhiraTranslations } from '../../@core/mhira-translations';
import { NzModalService } from 'ng-zorro-antd/modal';
import { TranslateService } from '@ngx-translate/core';

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
    public translations: MhiraTranslations,
    private modalService: NzModalService,
    private translate: TranslateService,
    private router: Router,
    private route: ActivatedRoute
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
  
  public isVisible(question: Question) {
    if (!question.relevant) return true;
    return this.skipLogic.find((logic) => logic.questionId === question._id)?.visible ?? true;
  }

  async onNext(index: any){
    const currentRequiredQuestions = this.questionnaire.questionGroups[index]?.uniqueQuestions
    .map((el: { subQuestions: any; }) => el.subQuestions)
    .flat()
    .filter((el: any) => el.required === true);

    const currentNonTableListRequiredQuestions = this.questionnaire.questionGroups[index]?.questions
    // .map((el: { subQuestions: any; }) => el.subQuestions)
    .flat()
    .filter((el: any) => el.required === true);

    const allRequiredQuestions = currentRequiredQuestions.concat(currentNonTableListRequiredQuestions);

    const answersIds = this.answers.map((el: any) => el.question);

    const unAnsweredRequiredQuestions = allRequiredQuestions.filter((el: any) => !answersIds.includes(el._id));

    if (unAnsweredRequiredQuestions.length !== 0) {
      const modal = this.modalService.confirm({
        nzOnCancel: () => {
          this.currentGroupIdx++;
          setTimeout(() => {
            this.scrollToTop();
          }, 400);
        },
        nzOnOk: () => true,
        nzCancelText: this.translate.instant('modal.cancel'),
        nzOkText: this.translate.instant('modal.ok'),
        nzTitle: this.translate.instant('modal.continue'),
        nzWidth: 800,
        nzClosable: false,
        nzContent: this.translate.instant('modal.unansweredQuestions', { count: unAnsweredRequiredQuestions.length }),
      });

      // wait for modal to successfully complete
      const confirmation = await modal.afterClose.toPromise();
      if (!confirmation) return;

      return;
    }

    this.currentGroupIdx++;
    setTimeout(() => {
      this.scrollToTop();
    }, 400);
  }

  async onNextOverview(index: any){
    const currentRequiredQuestions = this.questionnaire.questionGroups[index]?.uniqueQuestions
    .map((el: { subQuestions: any; }) => el.subQuestions)
    .flat()
    .filter((el: any) => el.required === true);

    const currentNonTableListRequiredQuestions = this.questionnaire.questionGroups[index]?.questions
    // .map((el: { subQuestions: any; }) => el.subQuestions)
    .flat()
    .filter((el: any) => el.required === true);

    const allRequiredQuestions = currentRequiredQuestions.concat(currentNonTableListRequiredQuestions);
 
    const answersIds = this.answers.map((el: any) => el.question);

    const unAnsweredRequiredQuestions = allRequiredQuestions.filter((el: any) => !answersIds.includes(el._id));

    if (unAnsweredRequiredQuestions.length !== 0) {
      const modal = this.modalService.confirm({
        nzOnCancel: () => {
          this.router.navigate(['../../overview'], { relativeTo: this.route });
        },
        nzOnOk: () => true,
        nzTitle: this.translate.instant('modal.continueOverview'),
        nzContent: this.translate.instant('modal.unansweredQuestionsOverview', { count: unAnsweredRequiredQuestions.length }),
        nzCancelText: this.translate.instant('modal.cancel'),
        nzWidth: 800,
        nzClosable: false,
        nzOkText: this.translate.instant('modal.ok'),
      });

      // wait for modal to successfully complete
      const confirmation = await modal.afterClose.toPromise();
      if (!confirmation) return;

      return;
    }
    this.router.navigate(['../../overview'], { relativeTo: this.route });
  }

  scrollToTop() {
    window.scrollTo({top: 0, behavior: 'smooth'})
  }

  addAnswer(questionId: string, value: string){
    value = value.toString();
    this.assessmentFormService.addAnswer({question: questionId, textValue: value}).subscribe()
  }

  private readSkipLogic() {
    const assessment = this.assessmentFormService.assessmentSnapshot;
    const currentQuestions = this.questionnaire.questionGroups[this.currentGroupIdx]?.questions;
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
