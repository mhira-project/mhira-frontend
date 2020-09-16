export interface Patient {
  id?: number;
  active?: boolean;
  medicalRecordNo?: string;
  firstName: string;
  middleName?: string;
  lastName: string;
  phone: string;
  email: string;
  address: string;
  gender: string;
  birthDate: string;
  birthCountryCode?: string;
  nationality: string;
}
