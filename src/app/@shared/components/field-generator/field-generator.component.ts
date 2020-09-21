import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FieldType } from './field.type';
import { FieldGroup } from '@shared/components/field-generator/field.group';

@Component({
  selector: 'app-field-generator',
  templateUrl: './field-generator.component.html',
  styleUrls: ['./field-generator.component.scss'],
})
export class FieldGeneratorComponent implements OnInit {
  @Input() form: FieldGroup[];
  @Output() submitFields: EventEmitter<any> = new EventEmitter<any>();
  @Output() inputChange: EventEmitter<any> = new EventEmitter<any>();

  constructor() {}

  nzFilterOption = () => true;

  ngOnInit(): void {}

  search(value: string): void {}

  handleSubmit(event: any) {
    const fields = {};
    for (const group of this.form) {
      for (const field of group.fields) {
        fields[field.name] = field.value;
      }
    }
    this.submitFields.emit(fields);
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
