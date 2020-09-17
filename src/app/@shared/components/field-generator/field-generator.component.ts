import { Component, OnInit, Input } from '@angular/core';
import { FieldType } from './field.type';

@Component({
  selector: 'app-field-generator',
  templateUrl: './field-generator.component.html',
  styleUrls: ['./field-generator.component.scss'],
})
export class FieldGeneratorComponent implements OnInit {
  @Input() fields: FieldType[];

  constructor() {}

  nzFilterOption = () => true;

  ngOnInit(): void {}

  search(value: string): void {}

  parseCheckBoxValues(options: { value: number | string; label: string; checked: boolean }[], field: FieldType): void {
    for (const option of options) {
      const index = -1; // field.value.indexOf(option.value);
      if (option.checked) {
        if (index > -1) {
          // field.value.push(option.value)
        }
      } else {
        if (index !== -1) {
          // field.value.splice(index, 1);
        }
      }
    }
  }
}
