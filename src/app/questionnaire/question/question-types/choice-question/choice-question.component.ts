import { Component, Input, OnInit } from '@angular/core';
import { Question } from '../../../../pages/assessment/@types/question';

@Component({
  selector: 'app-choice-question',
  templateUrl: './choice-question.component.html',
  styleUrls: ['../../question.component.scss', './choice-question.component.scss'],
})
export class ChoiceQuestionComponent implements OnInit {
  @Input() question: Question;
  selectedOptionIndex: number;

  constructor() {}

  ngOnInit(): void {}

  selectOption(index: number) {
    this.question.value = this.question.options[index].value;
    this.selectedOptionIndex = index;
  }
}
