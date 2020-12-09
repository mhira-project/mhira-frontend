import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Field } from '@shared/components/form/@types/field';

@Component({
  selector: 'app-array-input',
  templateUrl: './array-input.component.html',
  styleUrls: ['./array-input.component.scss'],
})
export class ArrayInputComponent implements OnInit {
  @Input() field: Field;
  @Output() valueChange: EventEmitter<any> = new EventEmitter<any>();
  @Input() inputMode = false;
  rows: any[] = [];
  children: any[];

  constructor() {}

  ngOnInit(): void {
    this.addRow();
  }

  addRow() {
    const childField = {};
    this.field.children.map((child: Field) => {
      childField[child.name] = null;
    });
    this.rows.push(childField);
    this.field.values.push(childField);
  }

  removeRow(rowIndex: number) {
    this.rows.splice(rowIndex, 1);
    this.field.values.splice(rowIndex, 1);
  }

  handleInputChange(row: any, child: Field, value: any) {
    row[child.name] = value;
    this.valueChange.emit({
      [this.field.name]: this.rows,
    });
  }
}
