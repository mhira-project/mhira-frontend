export interface Assessment {
  id?: number;
  active?: boolean;
  firstName: string;
  middleName?: string;
  lastName: string;
  hospitalId: string;
  clinician: any;
  plannedDate: string;
  firstVisit: string;
}
