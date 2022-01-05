export interface Contact {
  id?: number;
  patientId?: number;
  firstName: string;
  middleName?: string;
  lastName: string;
  email: string;
  phone: string;
  relation: string;
  emergency: boolean;
  note: string;
}

export interface UpdateOneEmergencyContactInput {
  id: number;
  update: UpdateEmergencyContact;
}

export interface UpdateEmergencyContact {
  firstName: string;
  lastName: string;
  relation: string;
}
