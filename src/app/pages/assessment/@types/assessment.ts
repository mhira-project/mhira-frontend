import { Patient } from '@app/pages/patients-management/@types/patient';
import { QuestionnaireVersion } from '@app/pages/questionnaire-management/@types/questionnaire';
import { User } from '@app/pages/user-management/@types/user';
import { Answer } from '../../../assessment-form/@types/answer';

export enum AssessmentStatus {
  COMPLETED = 'COMPLETED',
  PENDING = 'PENDING',
  PARTIALLY_COMPLETED = 'PARTIALLY_COMPLETED',
  EXPIRED = 'EXPIRED',
  ARCHIVED = 'ARCHIVED',
}

export interface Assessment {
  id?: number;
  name: string;
  patientId: number;
  clinicianId: number;
  patient: Patient;
  clinician?: User;
  informant: string;
  questionnaireAssessmentId?: string;
  createdAt?: Date;
}

export interface QuestionnaireAssessment {
  _id: string;
  questionnaires: QuestionnaireVersion[];
  answers: Answer[];
  status: AssessmentStatus;
}

export interface FullAssessment extends Assessment {
  questionnaireAssessment: QuestionnaireAssessment;
}

export interface FormattedAssessment extends Assessment {
  formattedPatient: string;
  formattedClinician: string;
}
