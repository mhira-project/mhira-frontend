import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

@Pipe({ name: 'dynamicPipe' })
export class DynamicPipe implements PipeTransform {
  transform(value: string, modifier: string) {
    if (!modifier) return value;
    if (value === null) {
      return '';
    } else {
      return eval(`this.${modifier}('${value}')`);
    }
  }

  getStatus(value: string | number): string {
    return value ? 'enabled' : 'disabled';
  }

  transformDate(date: Date | string, format: string = 'dd-MM-yyyy'): string {
    date = new Date(date); // if orginal type was a string
    date.setDate(date.getDate());
    return new DatePipe('en-US').transform(date, format);
  }
}
