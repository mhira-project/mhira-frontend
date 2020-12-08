import { Contact } from '@app/pages/home/@types/contact';
import { Informant } from '@app/pages/home/@types/informant';
import { User } from '@app/pages/administration/@types/user';
import { PatientStatus } from '@app/pages/home/@types/patient-status';

export interface Patient {
  id?: number;
  statusId?: number;
  medicalRecordNo?: string;
  firstName: string;
  middleName?: string;
  lastName: string;
  phone: string;
  phone2?: string;
  email?: string;
  addressStreet?: string;
  addressNumber?: string;
  addressApartment?: string;
  addressPlace?: string;
  addressPostalCode?: string;
  addressCountryId?: number;
  gender: string;
  birthDate?: string;
  birthCountryCode?: string;
  nationality?: string;
  createdAt?: string;
  formattedCreatedAt?: string;
  updatedAt?: string;
  formattedUpdatedAt?: string;
  emergencyContacts: Contact[];
  informants: Informant[];
  caseManagers: User[];
  country: any;
  status: PatientStatus;
}
