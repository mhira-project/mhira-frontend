export interface Paging {
  before?: string | null;
  after?: string | null;
  first?: number;
  last?: number;
}

export interface PageInfo {
  startCursor: string;
  endCursor: string;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}
