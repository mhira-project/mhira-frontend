import { Patient } from './patient';

export interface Informant {
  id?: number;
  patientId?: number;
  firstName: string;
  middleName?: string;
  lastName: string;
  phone: string;
  email?: string;
  address?: string;
  createdAt?: string;
  formattedCreatedAt?: string;
  updatedAt?: string;
  formattedUpdatedAt?: string;
  patient: Patient;
}
