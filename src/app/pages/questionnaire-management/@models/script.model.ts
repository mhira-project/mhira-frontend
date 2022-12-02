import * as moment from 'moment';
import { FormattedScript, Scripts } from '../@types/scripts';

export class ScriptsModel {
  public static fromJson(json: FormattedScript): Scripts {
    const data = { ...json };
    data.formattedReports = data.reports.map((report) => ({ color: 'red', title: report.name }));
    data.createdAt = moment(data.createdAt).format('DD-MM-YYYY');
    console.log(data);
    return data;
  }
}
