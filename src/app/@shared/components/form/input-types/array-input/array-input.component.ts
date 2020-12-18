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

  constructor() {}

  ngOnInit(): void {
    this.field.rows = [];
    this.addRow();
  }

  addRow() {
    const childItems: any[] = [];
    this.field.children.map((child: Field) => {
      childItems.push(child);
    });
    this.field.rows.push(childItems);
  }

  removeRow(rowIndex: number) {
    this.field.rows.splice(rowIndex, 1);
  }

  handleInputChange(child: Field, value: any, rowIndex: number) {
    /*const childItem = {};
    childItem[child.name] = value;
    this.field.rows[rowIndex] = childItem;
    this.valueChange.emit({
      [this.field.name]: this.field.rows,
    });*/
  }
}
