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
  inputsString: string;

  constructor() {}

  ngOnInit(): void {
    this.inputsString = JSON.stringify(this.field.children);
    this.field.rows = [];
    this.addRow();
  }

  addRow() {
    this.field.rows.push(JSON.parse(this.inputsString));
  }

  removeRow(rowIndex: number) {
    this.field.rows.splice(rowIndex, 1);
  }

  handleInputChange(child: Field, value: any, rowIndex: number) {}
}
