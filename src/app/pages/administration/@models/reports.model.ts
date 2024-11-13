import { FormattedReport, Reports } from '../@types/reports';
import * as moment from 'moment';
import 'moment/min/moment-with-locales';
export class ReportsModel {
  public static fromJson(json: FormattedReport): Reports {
    const data = { ...json };

    data.formattedRoles = data.roles.map((role) => ({ color: 'blue', title: role.name }));
    data.createdAt = moment(data.createdAt).format('DD-MM-YYYY');
    return data;
  }
}
