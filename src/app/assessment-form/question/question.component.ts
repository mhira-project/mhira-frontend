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

  public dateFormat: string;

  public answer: Answer;

  private _question: Question;

  constructor(private assessmentFormService: AssessmentFormService, private messageService: NzMessageService) {
    // get date format and convert to ng-zorro datepicker readable type
    this.dateFormat = JSON.parse(localStorage.getItem('settings'))?.dateFormat;
    this.dateFormat = this.dateFormat.replace(/[D]/g, 'd');
    this.dateFormat = this.dateFormat.replace(/[Y]/g, 'y');
  }

  public addAnswer(answer: Answer): void {
    this.assessmentFormService
      .addAnswer({
        question: answer.question,
        finishedAssessment: false,
        textValue: answer.textValue,
        multipleChoiceValue: answer.multipleChoiceValue,
        numberValue: answer.numberValue,
        dateValue: answer.dateValue,
        booleanValue: answer.booleanValue,
      })
      .subscribe(
        (answers) => (this.answer = answers.find((a) => a.question === this.question._id)),
        (err) => this.messageService.error('Unable to answer question - ' + err)
      );
  }

  private initAnswer(question: Question): void {
    const answers = this.assessmentFormService.assessmentSnapshot?.questionnaireAssessment?.answers ?? [];
    this.answer = answers.find((a) => a.question === question._id) ?? this.createBlankAnswer(question);
  }

  private createBlankAnswer(question: Question): Answer {
    const answer: Answer = {
      question: question._id,
    };

    if (question.type === QuestionType.TEXT) answer.textValue = '';
    if (question.type === QuestionType.SELECT_MULTIPLE) answer.multipleChoiceValue = [];

    return answer;
  }
}
