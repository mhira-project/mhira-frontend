import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FieldType } from './field.type';
import { FieldGroup } from '@shared/components/field-generator/field.group';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Form } from '@shared/components/field-generator/formt';

@Component({
  selector: 'app-field-generator',
  templateUrl: './field-generator.component.html',
  styleUrls: ['./field-generator.component.scss'],
})
export class FieldGeneratorComponent implements OnInit {
  @Input() form: Form;
  @Input() isLoading = false;
  @Input() loadingMessage = '';
  @Output() submitForm: EventEmitter<any> = new EventEmitter<any>();
  @Output() inputChange: EventEmitter<any> = new EventEmitter<any>();
  formGroup: FormGroup;

  constructor() {}

  nzFilterOption = () => true;

  ngOnInit(): void {
    this.createForm();
  }

  createForm(): void {
    const formControls = {};
    for (const group of this.form.groups) {
      for (const field of group.fields) {
        if (field.isRequired) {
          if (field.pattern) {
            formControls[field.name] = new FormControl('', [Validators.required, Validators.pattern(field.pattern)]);
          } else if (field.maxLength) {
            formControls[field.name] = new FormControl('', [
              Validators.required,
              Validators.maxLength(field.maxLength),
            ]);
          } else if (field.minLength) {
            formControls[field.name] = new FormControl('', [
              Validators.required,
              Validators.minLength(field.minLength),
            ]);
          } else {
            formControls[field.name] = new FormControl('', Validators.required);
          }
        } else {
          if (field.pattern) {
            formControls[field.name] = new FormControl('', Validators.pattern(field.pattern));
          } else if (field.maxLength) {
            formControls[field.name] = new FormControl('', Validators.maxLength(field.maxLength));
          } else if (field.minLength) {
            formControls[field.name] = new FormControl('', Validators.minLength(field.minLength));
          } else {
            formControls[field.name] = new FormControl();
          }
        }
      }
    }
    this.formGroup = new FormGroup(formControls);
  }

  search(value: string): void {}

  handleSubmitForm() {
    if (this.formGroup.invalid) {
      return;
    }
    this.submitForm.emit(this.formGroup.value);
  }

  handleInputChange(field: FieldType, event: any) {
    if (field.type === 'checkBox') {
      this.parseCheckBoxValues(event, field);
      return;
    }

    if (field.type === 'select' || field.type === 'radio') {
      this.inputChange.emit({ name: field.name, value: event });
      return;
    }

    this.inputChange.emit({ name: field.name, value: event.target.value });
  }

  parseCheckBoxValues(options: { value: number | string; label: string; checked: boolean }[], field: any): void {
    for (const option of options) {
      const index = field.value.indexOf(option.value);
      if (option.checked) {
        if (index === -1) {
          field.value.push(option.value);
        }
      } else {
        if (index !== -1) {
          field.value.splice(index, 1);
        }
      }
    }
    this.inputChange.emit({ title: field.title, value: field.value });
  }
}
