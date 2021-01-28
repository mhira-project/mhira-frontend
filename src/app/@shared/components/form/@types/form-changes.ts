import { SimpleChange, SimpleChanges } from '@angular/core';

interface TypedChange<T> extends SimpleChange {
  previousValue: T;
  currentValue: T;
}

export interface FormChanges extends SimpleChanges {
  resetForm: TypedChange<boolean>;
  populateForm: TypedChange<boolean>;
}
