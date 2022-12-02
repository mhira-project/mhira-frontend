import * as moment from 'moment';

export class AppDate {
  public static formatDate(date: string): string {
    const _date = new Date(date);
    const settings = JSON.parse(localStorage.getItem('settings'));
    return moment(_date).format(settings.dateFormat);
  }
}
