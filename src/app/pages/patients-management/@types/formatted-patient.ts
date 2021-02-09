import { Patient } from './patient';

export interface FormattedPatient extends Patient {
  formattedCreatedAt?: string;
  formattedUpdatedAt?: string;
  formattedBirthDate?: string;
  formattedStatus?: string;
  formattedInformants?: string;
  formattedCaseManagers?: string;
  patientTitle?: string;
}
