import { AssessmentStatus, FullAssessment } from './../../pages/assessment/@types/assessment';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AssessmentFormService } from '../assessment-form.service';
import { Question } from '../@types/question';
import { Answer } from '../@types/answer';
import { AssessmentService } from '../../pages/assessment/@services/assessment.service';
import { ErrorHandlerService } from '../../@shared/services/error-handler.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { MhiraTranslations } from '../../@core/mhira-translations';
import { forkJoin } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { Disclaimers } from '@app/pages/administration/@types/disclaimers';
import { finalize } from 'rxjs/operators';
import { DisclaimersService } from '@app/pages/administration/@services/disclaimers.service';

@Component({
  selector: 'app-assessment-overview',
  templateUrl: './assessment-overview.component.html',
  styleUrls: ['./assessment-overview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AssessmentOverviewComponent implements OnInit {
  public isLoading = false;
  public disclaimer: Disclaimers;
  public data: Partial<Disclaimers>[];
  public expiredDisclaimer: string;
  public completedDisclaimer: string;
  public plannedDisclaimer: string;
  public AssessmentStatus = AssessmentStatus;
  public assessment: FullAssessment;
  public questions: Question[];
  public questionnaireQuestions: { [K in string]: Question[] };

  public get answers(): Answer[] {
    return this.assessment.questionnaireAssessment.answers;
  }

  constructor(
    public assessmentFormService: AssessmentFormService,
    public translations: MhiraTranslations,
    private disclaimersService: DisclaimersService,
    private cdr: ChangeDetectorRef,
    private assessmentService: AssessmentService,
    private messageService: NzMessageService,
    private errorService: ErrorHandlerService,
    private translateService: TranslateService
  ) {}

  public ngOnInit(): void {
    this.assessmentFormService.assessment$.subscribe((assessment : any) => {
      this.assessment = assessment;
      this.questionnaireQuestions = {};
      this.questions = assessment.questionnaireAssessment.questionnaires.reduce((questions: any, questionnaire: any) => {
        let questionnaireQuestions = questionnaire.questionGroups.reduce(
          (qs: any, group: any) => [...qs, ...group.questions],
          []
        );
        // ************
        for(const unique of questionnaire.questionGroups?? []){
          for(const uq of unique.uniqueQuestions) {
            questionnaireQuestions = [...questionnaireQuestions, ...uq.subQuestions]
          }
        }
        // *************
        this.questionnaireQuestions[questionnaire._id] = questionnaireQuestions;
        return [...questions, ...questionnaireQuestions];
      }, []);

      this.cdr.detectChanges();
    });
    this.getDescription();
    console.log(this.completedDisclaimer);
  }

  public getMaxRequiredQuestions(questionnaireId: string): number {
    return this.questionnaireQuestions[questionnaireId]?.filter((q) => q.required && q.type !== 'note').length;
  }

  public getMaxNotRequiredQuestions(questionnaireId: string): number {
    return this.questionnaireQuestions[questionnaireId]?.filter((q) => !q.required && q.type !== 'note').length;
  }

  public getAnsweredQuestions(questionnaireId: string): number {
    return this.questionnaireQuestions[questionnaireId]?.reduce(
      (sum, q) => (this.answers.find((a) => a.question === q._id)?.valid ? (sum += 1) : sum),
      0
    );
  }

  public getAnsweredRequiredQuestions(questionnaireId: string): number {
    return this.questionnaireQuestions[questionnaireId]?.reduce(
      (sum, q) => (q.required && this.answers.find((a) => a.question === q._id)?.valid ? (sum += 1) : sum),
      0
    );
  }

  public getAnsweredOptionalQuestions(questionnaireId: string): number {
    return this.getAnsweredQuestions(questionnaireId) - this.getAnsweredRequiredQuestions(questionnaireId);
  }

  public isQuestionnaireDone(questionnaireId: string): boolean {
    const requiredQuestions = this.questionnaireQuestions[questionnaireId]?.filter((q) => q.required);
    return requiredQuestions?.every((q) => this.answers?.find((a) => a.question === q._id)?.valid);
  }

  public canAccessQuestionnaire(questionnaireIdx: number): boolean {
    if (this.assessment.questionnaireAssessment.status === 'COMPLETED') {
      return false;
    }
    if (questionnaireIdx === 0) return true;
    const previousQuestionnaireId = this.assessment.questionnaireAssessment.questionnaires[questionnaireIdx - 1]?._id;
    return this.isQuestionnaireDone(previousQuestionnaireId);
  }

  public completeAssessment(): void {
    const id = this.assessment.questionnaireAssessment._id;
    console.log('here');
    forkJoin([
      this.translateService.get(this.translations.assessmentForm.complete),
      this.assessmentService.changeAssessmentStatus(id, AssessmentStatus.COMPLETED),
    ]).subscribe(
      ([translation]) => {
        this.messageService.success(translation, {
          nzDuration: 5000,
        });
        this.assessment.questionnaireAssessment.status = AssessmentStatus.COMPLETED;
        this.cdr.detectChanges();
      },
      (err) => this.errorService.handleError(err, { prefix: `Unable to complete assessment with ID "${id}"` })
    );
  }

  private getDescription(): void {
    this.disclaimersService
      .disclaimers()
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe(
        ({ data }: any) => {
          data.disclaimers.map((disclaimer: any) => {
            if (disclaimer.type === 'plannedText') {
              this.plannedDisclaimer = disclaimer.description;
            } else if (disclaimer.type === 'expiredText') {
              this.expiredDisclaimer = disclaimer.description;
            } else if (disclaimer.type === 'completedText') {
              this.completedDisclaimer = disclaimer.description;
            }
          });
          this.cdr.detectChanges();
        },
        (err) => this.errorService.handleError(err, { prefix: 'Unable to load disclaimers' })
      );
  }
}
