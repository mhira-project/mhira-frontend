import { Patient } from '@app/pages/patients-management/@types/patient';
import { QuestionnaireVersion } from '@app/pages/questionnaire-management/@types/questionnaire';
import { User } from '@app/pages/user-management/@types/user';
import { Answer } from '../../../assessment-form/@types/answer';
import { TagInfo } from '../../../@shared/@modules/master-data/@types/list';
import { Caregiver } from '@app/pages/patients-management/@types/caregiver';
import { AssessmentAdministration } from '@app/pages/administration/@types/assessment-administration';

export enum AssessmentStatus {
  PLANNED = 'PLANNED',
  OPEN_FOR_COMPLETION = 'OPEN FOR COMPLETION',
  COMPLETED = 'COMPLETED',
  PARTIALLY_COMPLETED = 'PARTIALLY COMPLETED',
  EXPIRED = 'EXPIRED',
  CANCELLED = 'CANCELLED',
}

export enum AssessmentInformant {
  PATIENT = 'PATIENT',
  USER = 'USER',
  CAREGIVER = 'CAREGIVER',
}

export interface Assessment {
  id?: number;
  uuid?: string;
  name: string;
  assessmentType: AssessmentAdministration;
  patientId: number;
  note: string;
  clinicianId: number;
  patient: Patient;
  clinician?: User;
  informantType: string;
  questionnaireAssessmentId?: string;
  createdAt?: Date;
  deliveryDate?: Date;
  expirationDate?: Date;
  informantCaregiverRelation?: string;
  informantClinician?: User;
  emailStatus: string;
  questionnaireAssessment:any;
  questionnaires: []
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
  assessmentType: AssessmentAdministration;
  informantCaregiverRelation: string;
  emailReminder: boolean;
  receiverEmail: string;
  emailStatus: string;
  mailTemplateId: number;
}

export interface FormattedAssessment extends Assessment {
  formattedPatient: string;
  formattedClinician: string;
  formattedAssessmentType: string;
  formattedStatus: TagInfo;
  patientMedicalRecordNo: string;
  clinicianWorkId: string;
  formatedDeliveryDate?: string;
  formatedExpirationDate?: string;
  emailStatus: string;
  status: string;
  submissionDate: Date;
  questionnaireAssessment: {};
  emailFormatedStatus: {};
  formatedQuestionnaireNames: []
  formatedQuestionnaires: []
  questionnaires: []
}
