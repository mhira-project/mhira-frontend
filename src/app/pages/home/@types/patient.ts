export interface Patient {
  id?: number;
  active?: boolean;
  formattedActive?: string;
  medicalRecordNo?: string;
  firstName: string;
  middleName?: string;
  lastName: string;
  phone: string;
  email: string;
  address: string;
  gender: string;
  birthDate: string;
  formattedBirthDate: string;
  birthCountryCode?: string;
  nationality: string;
  createdAt?: string;
  formattedCreatedAt?: string;
  updatedAt?: string;
  formattedUpdateddAt?: string;
}
