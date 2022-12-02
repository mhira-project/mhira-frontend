import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Question } from '@app/pages/assessment/@types/question';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss'],
})
export class QuestionComponent implements OnInit {
  @Input() question: Question;
  @Output() getNextQuestion: EventEmitter<any> = new EventEmitter<any>();
  @Output() getPreviousQuestion: EventEmitter<any> = new EventEmitter<any>();

  constructor() {}

  ngOnInit(): void {}

  fetchNextQuestion() {
    this.getNextQuestion.emit();
  }

  fetchPreviousQuestion() {
    this.getPreviousQuestion.emit();
  }
}
