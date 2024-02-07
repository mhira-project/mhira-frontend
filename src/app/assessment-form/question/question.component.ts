import { Component, Input } from '@angular/core';
import { Question, QuestionType } from '@app/assessment-form/@types/question';
import { Answer } from '../@types/answer';
import { AssessmentFormService } from '../assessment-form.service';
import { ErrorHandlerService } from '../../@shared/services/error-handler.service';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

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

  public answerGiven = new Subject<Answer>();

  private _question: Question;

  constructor(
    private assessmentFormService: AssessmentFormService,
    private errorService: ErrorHandlerService
  ) {
    // get date format and convert to ng-zorro datepicker readable type
    // this.dateFormat = JSON.parse(localStorage.getItem('settings'))?.dateFormat;
    // this.dateFormat = this.dateFormat.replace(/[D]/g, 'd');
    // this.dateFormat = this.dateFormat.replace(/[Y]/g, 'y');

    // debounce answer
    this.answerGiven.pipe(debounceTime(500)).subscribe((answer) => this.addAnswer(answer));
  }

  onKeyPress = (evt: any) => {
    const charCode = evt.which || evt.keyCode;
    if ((charCode < 48 || charCode > 57) && charCode !== 46) {
      evt.preventDefault();
    }
  };

  public addAnswer(answer: Answer): void {
    this.assessmentFormService
      .addAnswer({
        question: answer.question,
        textValue: answer.textValue,
        multipleChoiceValue: answer.multipleChoiceValue,

        // nz number input gives "" when clearing field
        numberValue: (answer.numberValue as any) === '' ? null : answer.numberValue,

        dateValue: answer.dateValue,
        booleanValue: answer.booleanValue,
      })
      .subscribe(
        // override existing answer, but keep current values
        (answers) =>
          (this.answer = Object.assign(
            {},
            answers.find((a) => a.question === this.question._id),
            {
              textValue: this.answer.textValue,
              numberValue: this.answer.numberValue,
              booleanValue: this.answer.booleanValue,
              dateValue: this.answer.dateValue,
              multipleChoiceValue: this.answer.multipleChoiceValue,
            } as Partial<Answer>
          )),
        (err) => this.errorService.handleError(err, { prefix: 'Unable to answer question' })
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
