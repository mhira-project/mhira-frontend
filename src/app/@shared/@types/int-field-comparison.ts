export interface IntFieldComparison {
  is?: boolean;
  isNot?: boolean;
  eq?: number;
  neq?: number;
  gt?: number;
  gte?: number;
  lt?: number;
  lte?: number;
  in?: number[];
  notIn?: number[];
  between?: IntFieldComparisonBetween;
  notBetween?: IntFieldComparisonBetween;
}

export interface IntFieldComparisonBetween {
  lower?: number;
  upper?: number;
}
