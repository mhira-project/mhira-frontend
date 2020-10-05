import { Questionnaire } from '@app/pages/assessment/@types/questionnaire';

export interface Assessment {
  id?: number;
  active?: boolean;
  patientId?: number;
  clinicianId?: number;
  informantId?: number;
  firstName: string;
  middleName?: string;
  lastName: string;
  hospitalId: string;
  patient: any;
  clinician: any;
  informant: any;
  questionnaire: Questionnaire[];
  plannedDate: string;
  firstVisit: string;
}
