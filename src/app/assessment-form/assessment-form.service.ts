import { Injectable } from '@angular/core';
import { FullAssessment } from '@app/pages/assessment/@types/assessment';
import { BehaviorSubject, Observable } from 'rxjs';
import { AnswerAssessmentInput, Answer } from './@types/answer';
import { AssessmentService } from '../pages/assessment/@services/assessment.service';
import { QuestionnaireVersion } from '@app/pages/questionnaire-management/@types/questionnaire';
import { first, switchMap, tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AssessmentFormService {
  private _assessment = new BehaviorSubject<FullAssessment>(null);
  private _questionnaire = new BehaviorSubject<QuestionnaireVersion>(null);

  public get assessment$(): Observable<FullAssessment> {
    return this._assessment.asObservable();
  }

  public get assessmentSnapshot(): FullAssessment {
    return this._assessment.value;
  }

  public get questionnaire$(): Observable<QuestionnaireVersion> {
    return this._questionnaire.asObservable();
  }

  constructor(private assessmentService: AssessmentService) {}

  public setAssessment(assessment: FullAssessment): void {
    this._assessment.next(assessment);
  }

  public setQuestionnaire(questionnaireVersion: QuestionnaireVersion): void {
    this._questionnaire.next(questionnaireVersion);
  }

  public setAnswers(answers: Answer[]): void {
    this._assessment.next({
      ...this._assessment.value,
      questionnaireAssessment: {
        ...this._assessment.value?.questionnaireAssessment,
        answers,
      },
    });
  }

  public sendAnswer(answerInput: Omit<AnswerAssessmentInput, 'assessmentId' | 'questionnaireVersionId'>) {
    return this.questionnaire$.pipe(
      first(),
      switchMap((questionnaire) =>
        this.assessmentService.sendAnswer({
          ...answerInput,
          assessmentId: this._assessment.value.questionnaireAssessmentId,
          questionnaireVersionId: questionnaire._id,
        })
      ),
      tap((answers) => this.setAnswers(answers))
    );
  }
}
