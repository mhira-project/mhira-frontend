import { TagInfo } from '@shared/@modules/master-data/@types/list';
import { Patient } from '@app/pages/patients-management/@types/patient';

export interface Caregiver {
  id?: number;
  patientId?: number;
  firstName: string;
  middleName?: string;
  lastName: string;
  email: string;
  phone: string;
  relation?: string;
  emergency?: boolean;
  note?: string;
  street: string;
  number: string;
  apartment: string;
  place: string;
  postalCode: string;
  country: string;
  patients?: Patient[];
  patientCaregiverId?: number;
}

export interface FormattedCaregiver extends Caregiver {
  formattedStatus: TagInfo;
}
export interface UpdateOneCaregiverInput {
  id: number;
  update: UpdateCaregiver;
}

export interface UpdateCaregiver {
  firstName: string;
  lastName: string;
  relation: string;
}
