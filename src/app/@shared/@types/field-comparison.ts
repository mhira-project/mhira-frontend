export interface FieldComparison {
  is?: boolean;
  isNot?: boolean;
  eq?: number | string;
  neq?: number | string;
  gt?: number | string;
  gte?: number | string;
  lt?: number | string;
  lte?: number | string;
  like?: string;
  notLike?: string;
  iLike?: string;
  notILike?: string;
  in?: number[] | string[];
  notIn?: number[] | string[];
  between?: { lower?: number; upper?: number };
  notBetween?: { lower?: number; upper?: number };
}
