import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Form } from '@shared/components/field-generator/formt';
import { FormGroup } from '@angular/forms';
import { $e } from 'codelyzer/angular/styles/chars';

@Component({
  selector: 'app-custom-filter',
  templateUrl: './custom-filter.component.html',
  styleUrls: ['./custom-filter.component.scss'],
})
export class CustomFilterComponent implements OnInit {
  @Input() form: Form;
  @Input() isLoading = false;
  @Input() loadingMessage = '';
  @Output() submitForm: EventEmitter<any> = new EventEmitter<any>();
  @Output() inputChange: EventEmitter<any> = new EventEmitter<any>();
  formGroup: FormGroup;
  constructor() {}

  ngOnInit(): void {}

  submitFormEvent($event: any) {
    this.submitForm.emit($event);
  }

  inputChangeEvent($event: any) {
    this.inputChange.emit($event);
  }
}