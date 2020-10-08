import { Component, Input, OnInit } from '@angular/core';
import { Question } from '../../../../pages/assessment/@types/question';

@Component({
  selector: 'app-text-question',
  templateUrl: './text-question.component.html',
  styleUrls: ['../../question.component.scss', './text-question.component.scss'],
})
export class TextQuestionComponent implements OnInit {
  @Input() question: Question;

  constructor() {}

  ngOnInit(): void {}
}
