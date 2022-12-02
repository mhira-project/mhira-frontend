import { Patient } from './patient';
import { TagInfo } from '../../../@shared/@modules/master-data/@types/list';

export interface FormattedPatient extends Patient {
  formattedStatus?: TagInfo;
  formattedInformants?: string[];
  formattedCaseManagers?: string[];
  patientTitle?: string;
}
