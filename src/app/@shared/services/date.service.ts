import { Injectable } from '@angular/core';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root',
})
export class DateService {
  constructor() {}

  formatDate(date: string): string {
    const _date = new Date(date);
    const settings = JSON.parse(localStorage.getItem('settings'));
    return moment(_date).format(settings.dateFormat);
  }
}
