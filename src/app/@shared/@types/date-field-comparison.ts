export interface DateFieldComparison {
  is: boolean;
  isNot: boolean;
  eq: string;
  neq: string;
  gt: string;
  gte: string;
  lt: string;
  lte: string;
  in: string[];
  notIn: string[];
  between: DateFieldComparisonBetween;
  notBetween: DateFieldComparisonBetween;
}

export interface DateFieldComparisonBetween {
  lower?: string;
  upper?: string;
}
