import { Questionnaire } from '@app/pages/assessment/@types/questionnaire';

export interface Assessment {
  id?: number;
  date?: string;
  name?: string;
  patientId?: number;
  clinicianId?: number;
  informantId?: number;
  patient: any;
  clinician?: any;
  informant: any;
  questionnaire: Questionnaire[];
  plannedDate: string;
  firstVisit: string;
}
