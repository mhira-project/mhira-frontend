import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'formatDate',
})
export class DatePipe implements PipeTransform {
  transform(date: any, args?: any): any {
    const _date = new Date(date);
    const settings = JSON.parse(localStorage.getItem('settings'));
    return moment(_date).format(settings.dateFormat);
  }
}
