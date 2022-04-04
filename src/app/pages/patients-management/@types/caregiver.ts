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
  patientCaregivers: PatientRelation[];
  patientCaregiverId?: number;
}

export interface PatientRelation {
  relation: string;
  id: number;
  patient: {
    firstName: string;
  };
}

export interface FormattedCaregiver extends Caregiver {
  formattedStatus: TagInfo;
}
export interface UpdateOneCaregiverInput {
  id: number;
  update: UpdateCaregiver;
}

export interface UpdateOnePatientCaregiverInput {
  emergency: string;
  note: string;
  relation: string;
}

export interface UpdateCaregiver {
  firstName: string;
  lastName: string;
}

export interface SelectedCaregiver {
  email: string;
  firstName: string;
  id: number;
  lastName: string;
  middleName: string;
  phone: string;
}
