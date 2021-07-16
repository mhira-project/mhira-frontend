import { Injectable } from '@angular/core';
import { FullAssessment } from '@app/pages/assessment/@types/assessment';
import { BehaviorSubject, Observable } from 'rxjs';
import { AnswerAssessmentInput, Answer } from './@types/answer';
import { AssessmentService } from '../pages/assessment/@services/assessment.service';
import { QuestionnaireVersion } from '@app/pages/questionnaire-management/@types/questionnaire';
import { first, switchMap, tap } from 'rxjs/operators';
import { Question } from './@types/question';

@Injectable({ providedIn: 'root' })
export class AssessmentFormService {
  private _assessment = new BehaviorSubject<FullAssessment>(null);
  private _questionnaire = new BehaviorSubject<QuestionnaireVersion>(null);
  private _assessmentInfo: {
    questions?: Question[];
    answers?: Answer[];
    percentage?: number;
  } = {};

  public get assessment$(): Observable<FullAssessment> {
    return this._assessment.asObservable();
  }

  public get assessmentSnapshot(): FullAssessment {
    return this._assessment.value;
  }

  public get questionnaire$(): Observable<QuestionnaireVersion> {
    return this._questionnaire.asObservable();
  }

  public get percentageCompleted(): number {
    return this._assessmentInfo?.percentage ?? 0;
  }

  constructor(private assessmentService: AssessmentService) {}

  public setAssessment(assessment: FullAssessment): void {
    this._assessment.next(assessment);
    this.prepareAssessmentInfo(assessment);
  }

  public setQuestionnaire(questionnaireVersion: QuestionnaireVersion): void {
    this._questionnaire.next(questionnaireVersion);
  }

  public setAnswers(answers: Answer[]): void {
    this.setAssessment({
      ...this._assessment.value,
      questionnaireAssessment: {
        ...this._assessment.value?.questionnaireAssessment,
        answers,
      },
    });
  }

  public addAnswer(answerInput: Omit<AnswerAssessmentInput, 'assessmentId' | 'questionnaireVersionId'>) {
    return this.questionnaire$.pipe(
      first(),
      switchMap((questionnaire) =>
        this.assessmentService.addAnswer({
          ...answerInput,
          assessmentId: this._assessment.value.questionnaireAssessmentId,
          questionnaireVersionId: questionnaire._id,
        })
      ),
      tap((answers) => this.setAnswers(answers))
    );
  }

  private prepareAssessmentInfo(assessment: FullAssessment) {
    this._assessmentInfo.questions = assessment.questionnaireAssessment.questionnaires
      .map((q) => q.questionGroups.map((g) => g.questions).flat())
      .flat();
    this._assessmentInfo.answers = assessment.questionnaireAssessment.answers;
    const requiredQuestions = this._assessmentInfo.questions.filter((q) => q.required);

    const numAnswers = requiredQuestions.reduce(
      (sum, question) => (this._assessmentInfo.answers.find((a) => a.question === question._id) ? (sum += 1) : sum),
      0
    );
    this._assessmentInfo.percentage = (numAnswers / requiredQuestions.length) * 100;
  }
}
