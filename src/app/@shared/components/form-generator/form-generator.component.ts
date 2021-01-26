import { Component, EventEmitter, Input, OnChanges, OnInit, Output, ViewChild } from '@angular/core';
import { FormItemType } from './form-item.type';
import { FormBuilder, FormControl, FormArray, FormGroup, Validators } from '@angular/forms';
import setHours from 'date-fns/setHours';

@Component({
  selector: 'app-form-generator',
  templateUrl: './form-generator.component.html',
  styleUrls: ['./form-generator.component.css'],
})
export class FormGeneratorComponent implements OnInit, OnChanges {
  @ViewChild('metaSelect') nzSelect: any;

  @Input() formData: any = null;
  @Input() rowItems = 1;
  @Input() submitButtonText = 'Submit';
  @Input() formItems: FormItemType[] = [];
  @Output() submitForm: EventEmitter<any> = new EventEmitter<any>();

  today = new Date();
  timeDefaultValue = setHours(new Date(), 0);
  validateForm: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {}

  ngOnChanges(): void {
    this.createFormValidationRules();
    if (this.formData !== null) {
      this.validateForm.patchValue(this.formData);
    }
  }

  range(start: number, end: number): number[] {
    const result: number[] = [];
    for (let i = start; i < end; i++) {
      result.push(i);
    }
    return result;
  }

  createFormValidationRules() {
    const rules = this.formItems.reduce((initialObject, item) => {
      switch (item.type) {
        case 'text-array':
          initialObject[item.name] = this.fb.array([]);
          if (item.isRequired) {
            initialObject[item.name][0] = [null, [Validators.required]];
            initialObject[item.name].push(
              this.fb.group({
                name: '',
              })
            );
          }
          break;
        case 'meta':
          initialObject[item.name] = this.fb.array([]);
          if (item.isRequired) {
            initialObject[item.name][0] = [null, [Validators.required]];
            initialObject[item.name].push(
              this.fb.group({
                name: '',
                value: '',
              })
            );
          }
          break;
        case 'metaWithOptions':
          initialObject[item.name] = this.fb.array([]);
          if (this.formData) {
            this.formData[item.name].forEach((meta: any) => {
              const controls = {};
              item.fields.forEach((field) => {
                controls[field.name] = new FormControl('');
              });
              initialObject[item.name].push(this.fb.group(controls));
            });
          } else {
            if (item.isRequired) {
              initialObject[item.name][0] = [null, [Validators.required]];
              const controls = {};
              item.fields.forEach((field) => {
                controls[field.name] = new FormControl('');
              });
              initialObject[item.name].push(this.fb.group(controls));
            }
          }
          break;
        default:
          if (item.isRequired) {
            initialObject[item.name] = [null, [Validators.required]];
          } else {
            initialObject[item.name] = [null];
          }
      }
      return initialObject;
    }, {});
    this.validateForm = this.fb.group(rules);
  }

  addMetaField(formItem: FormItemType) {
    const meta = this.validateForm.get(formItem.name) as FormArray;
    switch (formItem.type) {
      case 'metaWithOptions':
        const controls = {};
        for (const field of formItem.fields) {
          controls[field.name] = new FormControl('');
        }
        meta.push(this.fb.group(controls));
        break;
      case 'meta':
        meta.push(
          this.fb.group({
            name: '',
            value: '',
          })
        );
        break;
      default:
        meta.push(
          this.fb.group({
            name: '',
          })
        );
    }
  }

  removeMetaFiled(index: number, formItem: any) {
    const meta = this.validateForm.get(formItem.name) as FormArray;
    meta.removeAt(index);
  }

  onSubmitForm(event: any): void {
    event.stopPropagation();

    for (const control of Object.values(this.validateForm.controls)) {
      control.markAsDirty();
      control.updateValueAndValidity();
    }

    if (this.validateForm.valid) {
      this.submitForm.emit(this.validateForm.value);
    }
  }
}
