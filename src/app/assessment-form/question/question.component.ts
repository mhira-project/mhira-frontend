import { Component, Input } from '@angular/core';
import { Question, QuestionType } from '@app/assessment-form/@types/question';
import { Answer } from '../@types/answer';
import { AssessmentFormService } from '../assessment-form.service';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss'],
})
export class QuestionComponent {
  @Input()
  public set question(q: Question) {
    this._question = q;
    if (!this.answer) this.initAnswer(q);
  }
  public get question(): Question {
    return this._question;
  }

  public QuestionType = QuestionType;

  public answer: Answer;

  private _question: Question;

  constructor(private assessmentFormService: AssessmentFormService, private messageService: NzMessageService) {}

  public sendAnswer(answer: Answer): void {
    this.assessmentFormService
      .sendAnswer({
        question: answer.question,
        finishedAssessment: false,
        textValue: answer.textValue,
        multipleChoiceValue: answer.multipleChoiceValue,
        numberValue: answer.numberValue,
        dateValue: answer.dateValue,
        booleanValue: answer.booleanValue,
      })
      .subscribe(
        (answers) => (this.answer._id = answers.find((a) => a.question === this.question._id)?._id),
        (err) => this.messageService.error('Unable to answer question - ' + err)
      );
  }

  private initAnswer(question: Question): void {
    const answers = this.assessmentFormService.assessmentSnapshot?.questionnaireAssessment?.answers ?? [];
    this.answer = answers.find((a) => a.question === question._id) ?? {
      question: question._id,
      textValue: undefined,
      booleanValue: undefined,
      numberValue: undefined,
      dateValue: undefined,
      multipleChoiceValue: undefined,
    };
  }
}
