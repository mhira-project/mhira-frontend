import { PageInfo } from './paging';

export interface Pagination {
  startCursor: string;
  endCursor: string;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface ConnectionResult<T> {
  pageInfo: PageInfo;
  edges: Array<{
    node: T;
    cursor: string;
  }>;
}
