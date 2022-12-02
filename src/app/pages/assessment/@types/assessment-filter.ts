import { FieldComparison } from '../../../@shared/@types/field-comparison';

export interface AssessmentFilter {
  and?: any[];
  or?: any[];
  id?: FieldComparison;
  date?: FieldComparison;
  name?: FieldComparison;
  patientId?: FieldComparison;
  clinicianId?: FieldComparison;
  informantId?: FieldComparison;
  status?: FieldComparison;
  createdAt?: FieldComparison;
}
