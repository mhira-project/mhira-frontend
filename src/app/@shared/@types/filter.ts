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
