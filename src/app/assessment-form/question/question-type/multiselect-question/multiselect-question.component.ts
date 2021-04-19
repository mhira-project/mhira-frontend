import { Component } from '@angular/core';
import { QuestionBase, Choice } from '../../../@types/question';

@Component({
  selector: 'app-multiselect-question',
  templateUrl: './multiselect-question.component.html',
  styleUrls: ['./multiselect-question.component.scss'],
})
export class MultiselectQuestionComponent extends QuestionBase {
  public toggle(choice: Choice): void {
    const idx = this.answer.multipleChoiceValue.indexOf(choice.name);

    if (idx >= 0) {
      this.answer.multipleChoiceValue.splice(idx, 1);
    } else {
      this.answer.multipleChoiceValue.push(choice.name);
    }

    this.answerChange.emit(this.answer);
  }

  public isChecked(choice: Choice): boolean {
    return this.answer.multipleChoiceValue.includes(choice.name);
  }
}
