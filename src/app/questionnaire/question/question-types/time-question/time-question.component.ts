import { Component, Input, OnInit } from '@angular/core';
import { Question } from '../../../../pages/assessment/@types/question';

@Component({
  selector: 'app-time-question',
  templateUrl: './time-question.component.html',
  styleUrls: ['../../question.component.scss', './time-question.component.scss'],
})
export class TimeQuestionComponent implements OnInit {
  @Input() question: Question;

  constructor() {}

  ngOnInit(): void {}
}
