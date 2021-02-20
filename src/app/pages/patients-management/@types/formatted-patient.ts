import { Patient } from './patient';
import { TagInfo } from '../../../@shared/@modules/master-data/master-data-table/master-data-table.component';

export interface FormattedPatient extends Patient {
  formattedStatus?: TagInfo;
  formattedInformants?: string[];
  formattedCaseManagers?: string[];
  patientTitle?: string;
}
