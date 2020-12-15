import { FieldComparison } from '@shared/@types/field-comparison';

export interface PatientFilter {
  and?: any[];
  or?: any[];
  id?: FieldComparison;
  active?: FieldComparison;
  medicalRecordNo?: FieldComparison;
  firstName?: FieldComparison;
  middleName?: FieldComparison;
  lastName?: FieldComparison;
  phone?: FieldComparison;
  email?: FieldComparison;
  address?: FieldComparison;
  gender?: FieldComparison;
  birthDate?: FieldComparison;
  birthCountryCode?: FieldComparison;
  nationality?: FieldComparison;
  createdAt?: FieldComparison;
}
