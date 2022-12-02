import { Component, Input, OnInit } from '@angular/core';
import { Question } from '../../../../pages/assessment/@types/question';

@Component({
  selector: 'app-number-question',
  templateUrl: './number-question.component.html',
  styleUrls: ['../../question.component.scss', './number-question.component.scss'],
})
export class NumberQuestionComponent implements OnInit {
  @Input() question: Question;

  constructor() {}

  ngOnInit(): void {}
}
