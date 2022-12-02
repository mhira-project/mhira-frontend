import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Field } from '@shared/components/form/@types/field';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-select-input',
  templateUrl: './select-input.component.html',
  styleUrls: ['./select-input.component.scss'],
})
export class SelectInputComponent implements OnInit {
  @Input() field: Field;
  @Input() inputMode = false;
  @Input() autoFill = false;
  @Input() inputModel: any;
  @Output() valueChange: EventEmitter<any> = new EventEmitter<any>();
  inputGroup: FormGroup;

  constructor() {}

  ngOnInit(): void {
    this.initializeInput();
  }

  initializeInput() {
    let control: FormControl | FormGroup;
    if (this.field.isRequired) {
      if (this.field.pattern) {
        control = new FormControl('', [Validators.required, Validators.pattern(this.field.pattern)]);
      } else if (this.field.maxLength) {
        control = new FormControl('', [Validators.required, Validators.maxLength(this.field.maxLength)]);
      } else if (this.field.minLength) {
        control = new FormControl('', [Validators.required, Validators.minLength(this.field.minLength)]);
      } else {
        control = new FormControl('', Validators.required);
      }
    } else {
      if (this.field.pattern) {
        control = new FormControl('', Validators.pattern(this.field.pattern));
      } else if (this.field.maxLength) {
        control = new FormControl('', Validators.maxLength(this.field.maxLength));
      } else if (this.field.minLength) {
        control = new FormControl('', Validators.minLength(this.field.minLength));
      } else {
        control = new FormControl();
      }
    }
    this.inputGroup = new FormGroup({ [this.field.name]: control });
  }

  inputIsValid(): boolean {
    this.field.isValid = this.inputGroup.valid;
    return this.field.isValid;
  }

  handleValueChange(input: any) {
    this.valueChange.emit(input);
  }
}
