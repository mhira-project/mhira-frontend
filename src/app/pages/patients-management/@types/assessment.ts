import { Patient } from '@app/pages/patients-management/@types/patient';
import { User } from '@app/pages/user-management/@types/user';
import { TagInfo } from '@shared/@modules/master-data/@types/list';

export enum AssessmentStatus {
  COMPLETED = 'COMPLETED',
  PENDING = 'PENDING',
  PARTIALLY_COMPLETED = 'PARTIALLY_COMPLETED',
  EXPIRED = 'EXPIRED',
  ARCHIVED = 'ARCHIVED',
}

export interface Assessment {
  id?: number;
  uuid?: string;
  name: string;
  patientId: number;
  clinicianId: number;
  patient: Patient;
  clinician?: User;
  informant: string;
  questionnaireAssessmentId?: string;
  createdAt?: Date;
  deliveryDate: Date;
  expirationDate: Date;
  status: AssessmentStatus;
}

export interface FormattedPatientAssessment extends Assessment {
  formattedPatient: string;
  formattedClinician: string;
  formattedStatus: TagInfo;
  patientMedicalRecordNo: string;
  clinicianWorkId: string;
}
