import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Field } from './@types/field';
import { FormGroup } from '@angular/forms';
import { Form } from '@shared/components/form/@types/form';
import { FieldGroup } from '@shared/components/form/@types/field.group';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
  @Input() form: Form;
  @Input() isLoading = false;
  @Input() loadingMessage = '';
  @Input() inputMode = true;
  @Input() autoFill = false;
  @Input() resetForm = false;
  @Input() showCancelButton = true;
  @Input() showSubmitButton = true;
  @Input() showEditButton = true;
  @Output() searchOptions: EventEmitter<any> = new EventEmitter<any>();
  @Output() submitForm: EventEmitter<any> = new EventEmitter<any>();
  @Output() inputChange: EventEmitter<any> = new EventEmitter<any>();
  // @Output() manual: EventEmitter<any> = new EventEmitter<any>();
  formGroup: FormGroup;

  constructor() {}

  ngOnInit(): void {}

  toggleEdit() {
    this.inputMode = !this.inputMode;
  }

  isValidForm(form?: Form): boolean {
    let isValid = true;
    form.groups.map((group: FieldGroup) => {
      group.fields.map((field: Field) => {
        if (field.type !== 'array') {
          isValid = field.isValid && isValid;
        }
      });
    });
    return isValid;
  }

  handleInputChange(field: Field, value: number | string | number[] | string[]) {
    this.inputChange.emit({ name: field.name, value });
  }

  handleSearch(value: any) {
    this.searchOptions.emit(value);
  }

  handleSubmitForm(form?: Form) {
    if (!this.isValidForm(form)) {
      return;
    }
    const formData = {};
    form.groups.map((group) => {
      group.fields.map((field) => {
        if (field.type === 'array') {
          const items: any[] = [];
          for (const row of field.rows) {
            const rowData = {};
            for (const item of row) {
              rowData[item.name] = item.value;
            }
            items.push(rowData);
          }
          formData[field.name] = items;
        } else {
          formData[field.name] = field.value;
        }
      });
    });
    this.submitForm.emit(formData);
  }
}
