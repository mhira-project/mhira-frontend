import { Component, Input } from '@angular/core';
import { Question, QuestionType } from '@app/assessment-form/@types/question';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss'],
})
export class QuestionComponent {
  public QuestionType = QuestionType;

  @Input()
  public set question(q: Question) {
    this._question = q;
  }
  public get question(): Question {
    return this._question;
  }

  private _question: Question;
}
