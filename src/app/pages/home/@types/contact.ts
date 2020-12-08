export interface Contact {
  id?: number;
  patientId?: number;
  firstName: string;
  middleName?: string;
  lastName: string;
  phone: string;
  createdAt?: string;
  formattedCreatedAt?: string;
  updatedAt?: string;
  formattedUpdatedAt?: string;
}
