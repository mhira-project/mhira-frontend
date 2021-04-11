import { Patient } from '@app/pages/patients-management/@types/patient';
import { QuestionnaireVersion } from '@app/pages/questionnaire-management/@types/questionnaire';
import { User } from '@app/pages/user-management/@types/user';
import { Answer } from '../../../assessment-form/@types/answer';

export interface Assessment {
  id?: number;
  name: string;
  patientId: number;
  clinicianId: number;
  patient: Patient;
  clinician?: User;
  informant: string;
}

export interface FullAssessment extends Assessment {
  questionnaireAssessment: {
    questionnaires: QuestionnaireVersion[];
    answers: Answer[];
  };
}

export interface FormattedAssessment extends Assessment {
  formattedPatient: string;
  formattedClinician: string;
}
