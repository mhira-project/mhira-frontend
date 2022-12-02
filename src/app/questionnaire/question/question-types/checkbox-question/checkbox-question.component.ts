import { Component, Input, OnInit } from '@angular/core';
import { Question } from '../../../../pages/assessment/@types/question';

@Component({
  selector: 'app-checkbox-question',
  templateUrl: './checkbox-question.component.html',
  styleUrls: ['../../question.component.scss', './checkbox-question.component.scss'],
})
export class CheckboxQuestionComponent implements OnInit {
  @Input() question: Question;
  selectedOptionIndices: number[] = [];

  constructor() {}

  ngOnInit(): void {}

  isSelected(index: number): boolean {
    return this.selectedOptionIndices.includes(index);
  }

  selectOption(index: number) {
    const optionIndex = this.selectedOptionIndices.indexOf(index);
    if (optionIndex === -1) {
      this.selectedOptionIndices.push(index);
    } else {
      this.selectedOptionIndices.splice(optionIndex, 1);
    }
    const values = [];
    /* tslint:disable-next-line:prefer-for-of */
    for (let i = 0; i < this.selectedOptionIndices.length; i++) {
      values.push(this.question.options[index].value);
    }
    this.question.value = values;
  }
}
