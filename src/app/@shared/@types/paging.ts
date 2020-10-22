export interface Paging {
  before?: string;
  after?: string;
  first?: number;
  last?: number;
  startCursor?: string;
  endCursor?: string;
  hasPreviousPage?: boolean;
  hasNextPage?: boolean;
}
