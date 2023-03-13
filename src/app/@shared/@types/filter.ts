export interface Filter {
  and?: any[];
  or?: any[];
  date?: string;
  name?: string;
  patientId?: number;
  patients?: any;
  clinicianId?: number;
  informantId?: number;
  status?: string;
  createdAt?: string;
  updatedAt?: string;
}
