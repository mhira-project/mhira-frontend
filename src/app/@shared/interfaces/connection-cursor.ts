export interface ConnectionCursor {
  startCursor: string;
  endCursor: string;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}
