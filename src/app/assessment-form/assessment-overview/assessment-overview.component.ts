import { FullAssessment } from './../../pages/assessment/@types/assessment';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AssessmentFormService } from '../assessment-form.service';
import { Question } from '../@types/question';
import { Answer } from '../@types/answer';

@Component({
  selector: 'app-assessment-overview',
  templateUrl: './assessment-overview.component.html',
  styleUrls: ['./assessment-overview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AssessmentOverviewComponent implements OnInit {
  public assessment: FullAssessment;
  public questions: Question[];
  public questionnaireQuestions: { [K in string]: Question[] };

  public get answers(): Answer[] {
    return this.assessment.questionnaireAssessment.answers;
  }

  public get requiredQuestions(): Question[] {
    return this.questions.filter((q) => q.required);
  }

  public get percentageCompleted(): number {
    const numAnswers = this.requiredQuestions.reduce(
      (sum, question) => (this.answers.find((a) => a.question === question._id) ? (sum += 1) : sum),
      0
    );
    return (numAnswers / this.requiredQuestions.length) * 100;
  }

  constructor(public assessmentFormService: AssessmentFormService, private cdr: ChangeDetectorRef) {}

  public ngOnInit(): void {
    this.assessmentFormService.assessment$.subscribe((assessment) => {
      this.assessment = assessment;
      this.questionnaireQuestions = {};
      this.questions = assessment.questionnaireAssessment.questionnaires.reduce((questions, questionnaire) => {
        const questionnaireQuestions = questionnaire.questionGroups.reduce(
          (qs, group) => [...qs, ...group.questions],
          []
        );
        this.questionnaireQuestions[questionnaire._id] = questionnaireQuestions;
        return [...questions, ...questionnaireQuestions];
      }, []);

      this.cdr.detectChanges();
    });
  }

  public getMaxQuestions(questionnaireId: string): number {
    return this.questionnaireQuestions[questionnaireId].length;
  }

  public getAnsweredQuestions(questionnaireId: string): number {
    return this.questionnaireQuestions[questionnaireId].reduce(
      (sum, q) => (this.answers.find((a) => a.question === q._id) ? (sum += 1) : sum),
      0
    );
  }

  public isQuestionnaireDone(questionnaireId: string): boolean {
    const requiredQuestions = this.questionnaireQuestions[questionnaireId].filter((q) => q.required);
    return requiredQuestions.every((q) => this.answers.find((a) => a.question === q._id));
  }

  public canAccessQuestionnaire(questionnaireIdx: number): boolean {
    if (questionnaireIdx === 0) return true;
    const previousQuestionnaireId = this.assessment.questionnaireAssessment.questionnaires[questionnaireIdx - 1]._id;
    return this.isQuestionnaireDone(previousQuestionnaireId);
  }
}
