export interface CaseManagerFilter {
  and?: any[];
  or?: any[];
  first?: number;
  after?: string;
  last?: number;
  before?: string;
  searchKeyword?: string;
  patientId?: number;
  caseManagerId?: number;
}
