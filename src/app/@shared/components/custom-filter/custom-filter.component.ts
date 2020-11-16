import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Form } from '@shared/components/field-generator/formt';
import { FieldGeneratorComponent } from '@shared/components/field-generator/field-generator.component';
import { FieldGroup } from '@shared/components/field-generator/field.group';
import { FieldType } from '@shared/components/field-generator/field.type';

@Component({
  selector: 'app-custom-filter',
  templateUrl: './custom-filter.component.html',
  styleUrls: ['./custom-filter.component.scss'],
})
export class CustomFilterComponent implements OnInit {
  @ViewChild(FieldGeneratorComponent) child: FieldGeneratorComponent;

  @Input() form: Form;
  @Input() isLoading = false;
  @Input() loadingMessage = '';
  @Input() primaryButtonTitle = 'Apply';
  @Input() secondaryButtonTitle = 'Clear';
  @Output() submitForm: EventEmitter<any> = new EventEmitter<any>();
  @Output() inputChange: EventEmitter<any> = new EventEmitter<any>();
  constructor() {}

  ngOnInit(): void {}

  submitFormEvent(data: any) {
    const filter = {};
    if (Object.keys(data).length > 0) {
      Object.keys(data).forEach((key: string) => {
        // work on progress
        // get formItem in form using key
        let foundFields: FieldType[];
        foundFields = [];
        if (data[key] !== null && data[key].length > 0) {
          this.form.groups.forEach((group: FieldGroup) => {
            group.fields.find((field) => {
              if (field.name === key) return foundFields.push(field);
            });
          });
          foundFields.forEach((field: FieldType) => {
            switch (field.type) {
              case 'text':
                filter[key] = { iLike: `%${data[key]}%` };
                break;
              case 'textArea':
                filter[key] = { iLike: `%${data[key]}%` };
                break;
              case 'number':
                filter[key] = { iLike: `%${data[key]}%` };
                break;
              case 'select':
                filter[key] = { iLike: `%${data[key]}%` };
                break;
              case 'checkBox':
                filter[key] = { is: `${data[key]}` };
                break;
              case 'radio':
                filter[key] = { is: `${data[key]}` };
                break;
              case 'date':
                filter[key] = { eq: `${data[key]}` };
                break;
              default:
                filter[key] = { Like: `%${data[key]}%` };
            }
          });
        }
      });
    }

    this.submitForm.emit(filter);
  }

  inputChangeEvent($event: any) {
    this.inputChange.emit($event);
  }

  primaryButtonAction() {
    this.child.handleSubmitForm();
  }

  secondaryButtonAction() {
    this.child.formGroup.reset();
    this.submitForm.emit({});
  }
}
