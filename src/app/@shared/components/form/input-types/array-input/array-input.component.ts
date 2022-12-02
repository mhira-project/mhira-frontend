import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Field } from '../../@types/field';

@Component({
  selector: 'app-array-input',
  templateUrl: './array-input.component.html',
  styleUrls: ['./array-input.component.scss'],
})
export class ArrayInputComponent implements OnInit {
  @Input() field: Field;
  @Output() valueChange: EventEmitter<any> = new EventEmitter<any>();
  @Output() rowAdded: EventEmitter<any> = new EventEmitter<any>();
  @Output() rowRemoved: EventEmitter<any> = new EventEmitter<any>();
  @Input() inputMode = false;
  @Input() autoFill = false;
  inputsString: string;

  constructor() {}

  ngOnInit(): void {
    this.inputsString = JSON.stringify(this.field.children);
    if (this.field.rows.length === 0) {
      this.addRow();
    }
  }

  addRow() {
    try {
      this.field.rows.push(JSON.parse(this.inputsString));
      this.emitRowAdded(this.field);
    } catch (e) {
      console.log(e, this.inputsString);
    }
  }

  emitRowAdded(field: Field) {
    this.rowAdded.emit(field);
  }

  removeRow(rowIndex: number) {
    this.field.rows.splice(rowIndex, 1);
    this.emitRowRemoved(this.field);
  }

  emitRowRemoved(field: Field) {
    if (this.field.rows.length > 0) {
      this.rowRemoved.emit(field);
    }
  }

  handleInputChange(child: Field, value: boolean | number | string | number[] | string[], rowIndex: number) {
    this.valueChange.emit({ name: child.name, value, rowIndex });
  }
}
