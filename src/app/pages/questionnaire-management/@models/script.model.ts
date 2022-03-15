import * as moment from 'moment';
import { FormattedScript, Scripts } from '../@types/scripts';

export class ScriptsModel {
  public static fromJson(json: FormattedScript): Scripts {
    const data = { ...json };
    // data.formattedReports = data.reportRoles.map((role) => ({ color: 'blue', title: role.role.name }));
    data.createdAt = moment(data.createdAt).format('DD-MM-YYYY');
    return data;
  }
}
