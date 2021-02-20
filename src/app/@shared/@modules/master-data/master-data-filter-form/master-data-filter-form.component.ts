import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TableColumn } from '../master-data-table/master-data-table.component';
import { Form } from '../../../components/form/@types/form';
import { Field } from '../../../components/form/@types/field';
import { NzDrawerComponent } from 'ng-zorro-antd';
import { Filter } from '../../../@types/filter';

@Component({
  selector: 'app-master-data-filter-form',
  templateUrl: './master-data-filter-form.component.html',
  styleUrls: ['./master-data-filter-form.component.scss'],
})
export class MasterDataFilterFormComponent<T> {
  @Input()
  public drawer: NzDrawerComponent;

  @Input()
  public set columns(columns: TableColumn<T>[]) {
    this._columns = columns;
    this.form = {
      submitButtonText: 'Apply',
      groups: [
        {
          fields: columns
            .filter((c) => c.filterField)
            .map(
              (c) =>
                ({
                  name: c.altName ?? c.name,
                  description: c.title,
                  span: 24,
                  ...c.filterField,
                } as Field)
            ),
        },
      ],
    };
  }
  public get columns(): TableColumn<T>[] {
    return this._columns;
  }

  @Output()
  public filter = new EventEmitter<Filter>();

  public form: Form;

  private _columns: TableColumn<T>[];

  public onFilter(event: { [K in keyof T]: any }): void {
    const filters = Object.entries(event)
      .filter(([_, value]) => value !== undefined)
      .map(([key, value]) => {
        const column = this.columns.find((c) => c.altName ?? c.name === key);
        return { [key]: this.getFilter(column.filterField.type, value) };
      });

    this.filter.emit({ and: filters });
  }

  private getFilter(type: Field['type'], value: any): {} {
    if (value === null) return { is: null };

    switch (type) {
      case 'select':
        return { eq: value };
      case 'checkBox':
        return { eq: value };
      case 'radio':
        return { eq: value };
      case 'date':
        return { eq: value };
      default:
        return { iLike: `%${value}%` };
    }
  }
}
