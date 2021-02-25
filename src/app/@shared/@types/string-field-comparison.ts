export interface StringFieldComparison {
  is?: boolean;
  isNot?: boolean;
  eq?: string;
  neq?: string;
  gt?: string;
  gte?: string;
  lt?: string;
  lte?: string;
  like: string;
  notLike?: string;
  iLike?: string;
  notILike?: string;
  in?: string[];
  notIn?: string[];
}
