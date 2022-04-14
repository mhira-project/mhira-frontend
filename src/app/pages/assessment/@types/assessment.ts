import { Patient } from '@app/pages/patients-management/@types/patient';
import { QuestionnaireVersion } from '@app/pages/questionnaire-management/@types/questionnaire';
import { User } from '@app/pages/user-management/@types/user';
import { Answer } from '../../../assessment-form/@types/answer';
import { TagInfo } from '../../../@shared/@modules/master-data/@types/list';
import { Caregiver } from '@app/pages/patients-management/@types/caregiver';

export enum AssessmentStatus {
  PLANNED = 'PLANNED',
  OPEN_FOR_COMPLETION = 'OPEN_FOR_COMPLETION',
  COMPLETED = 'COMPLETED',
  PARTIALLY_FILLED = 'PARTIALLY_FILLED',
  EXPIRED = 'EXPIRED',
  CANCELLED = 'CANCELLED',
}

export interface Assessment {
  id?: number;
  uuid?: string;
  name: string;
  patientId: number;
  note: string;
  clinicianId: number;
  patient: Patient;
  clinician?: User;
  informant: string;
  questionnaireAssessmentId?: string;
  createdAt?: Date;
  deliveryDate?: Date;
  expirationDate?: Date;
}

export interface QuestionnaireAssessment {
  _id: string;
  questionnaires: QuestionnaireVersion[];
  answers: Answer[];
  status: AssessmentStatus;
}

export interface FullAssessment extends Assessment {
  questionnaireAssessment: QuestionnaireAssessment;
  informantClinician: User;
  informantCaregiver: Caregiver;
}

export interface FormattedAssessment extends Assessment {
  formattedPatient: string;
  formattedClinician: string;
  formattedStatus: TagInfo;
  patientMedicalRecordNo: string;
  clinicianWorkId: string;
  formatedDeliveryDate?: string;
  formatedExpirationDate?: string;
}
