import { Component } from '@angular/core';
import { QuestionBaseComponent } from '../../../@types/question';

@Component({
  selector: 'app-select-question',
  templateUrl: './select-question.component.html',
  styleUrls: ['./select-question.component.scss'],
})
export class SelectQuestionComponent extends QuestionBaseComponent {
  public onChange(value: string): void {
    // stop redundant calls by change detection
    if (value === this.answer.textValue) return;

    // update & emit new value
    this.answer.textValue = value;
    this.answerChange.emit(this.answer);
  }
}
