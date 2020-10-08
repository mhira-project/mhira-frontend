import { Component, Input, OnInit } from '@angular/core';
import { Question } from '../../../../pages/assessment/@types/question';

@Component({
  selector: 'app-date-question',
  templateUrl: './date-question.component.html',
  styleUrls: ['../../question.component.scss', './date-question.component.scss'],
})
export class DateQuestionComponent implements OnInit {
  @Input() question: Question;

  constructor() {}

  ngOnInit(): void {}
}
