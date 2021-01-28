import { Component, OnInit, OnChanges, Input, EventEmitter, Output } from '@angular/core';
import { Field } from './@types/field';
import { FormGroup } from '@angular/forms';
import { Form } from './@types/form';
import { FieldGroup } from './@types/field.group';
import { FormChanges } from '@shared/components/form/@types/form-changes';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit, OnChanges {
  @Input() form: Form;
  @Input() formData: any;
  @Input() isLoading = false;
  @Input() loadingMessage = '';
  @Input() inputMode = true;
  @Input() resetForm = false;
  @Input() showCancelButton = true;
  @Input() showSubmitButton = true;
  @Input() showEditButton = true;
  @Input() populateForm = false;
  @Input() uploadUrl: string;
  @Input() images: any[];
  @Output() searchOptions: EventEmitter<any> = new EventEmitter<any>();
  @Output() fileUploaded: EventEmitter<any> = new EventEmitter<any>();
  @Output() submitForm: EventEmitter<any> = new EventEmitter<any>();
  @Output() inputChange: EventEmitter<any> = new EventEmitter<any>();
  @Output() rowAdded: EventEmitter<any> = new EventEmitter<any>();
  @Output() rowRemoved: EventEmitter<any> = new EventEmitter<any>();
  @Output() formUpdate: EventEmitter<any> = new EventEmitter<any>();
  // @Output() manual: EventEmitter<any> = new EventEmitter<any>();
  formGroup: FormGroup;
  defaultValue: any;

  constructor() {}

  ngOnInit(): void {}

  ngOnChanges(changes: FormChanges) {
    if (changes.resetForm && changes.resetForm.currentValue) {
      this.parseForm(null);
    }

    if (changes.populateForm && changes.populateForm.currentValue) {
      this.parseForm();
    }
  }

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

  parseArrays(field: Field): any[] {
    const items: any[] = [];
    for (const row of field.rows) {
      const rowData = {};
      for (const item of row) {
        if (item.type === 'array') {
          rowData[item.name] = this.parseArrays(item);
          continue;
        }
        rowData[item.name] = item.value;
      }
      items.push(rowData);
    }
    return items;
  }

  parseForm(defaultValue?: any) {
    if (this.formData) {
      if (defaultValue) {
        this.defaultValue = defaultValue;
      }
      if (this.formData.images) {
        this.images = this.formData.images;
      }
      this.form.groups.map((group) => {
        group.fields.map((field) => {
          if (field.type === 'array') {
            this.parseArrayDataForEdit(this.formData, field);
          } else {
            field.value = this.resetForm ? defaultValue : this.formData[field.name];
          }
        });
      });
    }
  }

  parseArrayDataForEdit(objectToBeEdited: any, field: Field, parent?: Field, row: any[] = []) {
    field.rows = [];
    const objectString = JSON.stringify(field);
    const items = objectToBeEdited[field.name];
    items.map((item: any) => {
      const rowItem: any[] = [];
      const object = JSON.parse(objectString);
      object.children.map((child: Field) => {
        if (child.type === 'array') {
          const childObjectString = JSON.stringify(child);
          const childItems = item[child.name];
          childItems.map((childItem: any) => {
            const childRowItem: any[] = [];
            const childObject = JSON.parse(childObjectString);
            childObject.children.map((grandChild: Field) => {
              grandChild.value = this.resetForm ? this.defaultValue : childItem[grandChild.name];
              childRowItem.push(grandChild);
            });
            child.rows.push(childRowItem);
          });
        } else {
          child.value = this.resetForm ? this.defaultValue : item[child.name];
        }
        rowItem.push(child);
      });
      field.rows.push(rowItem);
      row.push(rowItem);
    });
    if (parent) {
      parent.rows.push(row);
    }
  }

  handleInputChange(field: Field, value: boolean | number | string | number[] | string[]) {
    this.inputChange.emit({ name: field.name, value });
  }

  handleSearch(value: any) {
    this.searchOptions.emit(value);
  }

  handleRowAdded(value: any) {
    this.rowAdded.emit(value);
  }

  handleRowRemoved(value: any) {
    this.rowRemoved.emit(value);
  }

  handleFileUpload(response: any) {
    this.fileUploaded.emit(response);
  }

  handleSubmitForm(form?: Form) {
    if (!this.isValidForm(form)) {
      return;
    }
    const formData = {};
    form.groups.map((group) => {
      group.fields.map((field) => {
        if (field.type === 'array') {
          formData[field.name] = this.parseArrays(field);
        } else {
          formData[field.name] = field.value;
        }
      });
    });
    this.submitForm.emit(formData);
  }
}
