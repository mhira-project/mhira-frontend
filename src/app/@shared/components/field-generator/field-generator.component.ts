import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormItemType } from '@shared/components/form-generator/form-item.type';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import setHours from "date-fns/setHours";

@Component({
  selector: 'app-field-generator',
  templateUrl: './field-generator.component.html',
  styleUrls: ['./field-generator.component.scss'],
})
export class FieldGeneratorComponent implements OnInit {
  @Input() formItems: FormItemType[] = [];
  @Input()  validateForm: FormGroup;
  @Input() timeDefaultValue = setHours(new Date(), 0);
  @Input() fb: FormBuilder;
  @Output() addMetaFieldEvent: EventEmitter<any> = new EventEmitter<any>();
  constructor() {}

  ngOnInit(): void {}

  addMetaField(formItem: any) {
    this.addMetaFieldEvent.emit(formItem)
  }
  removeMetaFiled(index: number, formItem: any) {
    const meta = this.validateForm.get(formItem.name) as FormArray;
    meta.removeAt(index);
  }
}
