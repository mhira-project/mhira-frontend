import { IntFieldComparison } from './int-field-comparison';
import { StringFieldComparison } from './string-field-comparison';
import { DateFieldComparison } from './date-field-comparison';
export interface Filter {
  and?: any[];
  or?: any[];
  date?: string;
  name?: string;
  patientId?: number;
  clinicianId?: number;
  informantId?: number;
  status?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface PermissionFilter {
  and?: PermissionFilter[];
  or?: PermissionFilter[];
  id?: IntFieldComparison;
  name?: StringFieldComparison;
  guard?: StringFieldComparison;
  createdAt?: DateFieldComparison;
  updatedAt?: DateFieldComparison;
}
