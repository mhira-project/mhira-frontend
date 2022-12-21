import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-questionnaire-modal',
  templateUrl: './questionnaire-modal.component.html',
  styleUrls: ['./questionnaire-modal.component.scss'],
})
export class QuestionnaireModalComponent implements OnInit {
  @Input()
  isVisible: boolean;

  @Input()
  questionnaire: any;

  @Output()
  handleOkEvent = new EventEmitter<string>();

  @Output()
  handleCancelEvent = new EventEmitter<string>();

  constructor() {}

  ngOnInit(): void {}

  handleOkHandler(): void {
    this.handleOkEvent.emit();
  }

  handleCancelHandler(): void {
    this.handleCancelEvent.emit();
  }
}
