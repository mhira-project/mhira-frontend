import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Field } from '@shared/components/form/@types/field';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-radio-input',
  templateUrl: './radio-input.component.html',
  styleUrls: ['./radio-input.component.scss'],
})
export class RadioInputComponent implements OnInit {
  @Input() field: Field;
  @Input() inputMode = false;
  @Input() autoFill = false;
  @Output() valueChange: EventEmitter<any> = new EventEmitter<any>();
  inputGroup: UntypedFormGroup;

  constructor() {}

  ngOnInit(): void {
    this.initializeInput();
  }

  initializeInput() {
    let control: UntypedFormControl | UntypedFormGroup;
    if (this.field.isRequired) {
      if (this.field.pattern) {
        control = new UntypedFormControl('', [Validators.required, Validators.pattern(this.field.pattern)]);
      } else if (this.field.maxLength) {
        control = new UntypedFormControl('', [Validators.required, Validators.maxLength(this.field.maxLength)]);
      } else if (this.field.minLength) {
        control = new UntypedFormControl('', [Validators.required, Validators.minLength(this.field.minLength)]);
      } else {
        control = new UntypedFormControl('', Validators.required);
      }
    } else {
      if (this.field.pattern) {
        control = new UntypedFormControl('', Validators.pattern(this.field.pattern));
      } else if (this.field.maxLength) {
        control = new UntypedFormControl('', Validators.maxLength(this.field.maxLength));
      } else if (this.field.minLength) {
        control = new UntypedFormControl('', Validators.minLength(this.field.minLength));
      } else {
        control = new UntypedFormControl();
      }
    }
    this.inputGroup = new UntypedFormGroup({ [this.field.name]: control });
  }

  inputIsValid(): boolean {
    this.field.isValid = this.inputGroup.valid;
    return this.field.isValid;
  }

  handleValueChange(input: any) {
    this.valueChange.emit(input);
  }
}
