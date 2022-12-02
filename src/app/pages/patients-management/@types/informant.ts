import { Patient } from '@app/pages/patients-management/@types/patient';

export interface Informant {
  id?: number;
  patientId?: number;
  firstName: string;
  middleName?: string;
  lastName: string;
  phone?: string;
  email?: string;
  address: string;
  relationshipTypeId?: number;
  createdAt: string;
  updatedAt?: string;
  relationshipType: {
    id?: number;
    name: string;
    createdAt: string;
    updatedAt?: string;
  };
  patient: Patient;
}
