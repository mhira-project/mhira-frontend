import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Field } from '@shared/components/form/@types/field';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Subject, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-search-input',
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.scss'],
})
export class SearchInputComponent implements OnInit {
  @Input() field: Field;
  @Input() inputMode = false;
  @Input() autoFill = false;
  @Output() valueChange: EventEmitter<any> = new EventEmitter<any>();
  @Output() searchOptions: EventEmitter<any> = new EventEmitter<any>();
  inputGroup: UntypedFormGroup;
  public optionsSearch = new Subject<string>();
  private optionsSearchSubscription: Subscription;

  constructor() {
    this.optionsSearchSubscription = this.optionsSearch
      .pipe(debounceTime(1000), distinctUntilChanged())
      .subscribe((value) => {
        if (value && value !== '') {
          this.search(value);
        }
      });
  }

  ngOnInit(): void {
    this.initializeInput();
  }

  search(value: string): void {
    this.searchOptions.emit({ field: this.field, keyword: value });
  }

  initializeInput() {
    let control: UntypedFormControl | UntypedFormGroup;
    if (this.field.isRequired) {
      if (this.field.pattern) {
        control = new UntypedFormControl('', [Validators.required, Validators.pattern(this.field.pattern)]);
      } else if (this.field.maxLength) {
        control = new UntypedFormControl('', [Validators.required, Validators.maxLength(this.field.maxLength)]);
      } else if (this.field.minLength) {
        control = new UntypedFormControl('', [Validators.required, Validators.minLength(this.field.minLength)]);
      } else {
        control = new UntypedFormControl('', Validators.required);
      }
    } else {
      if (this.field.pattern) {
        control = new UntypedFormControl('', Validators.pattern(this.field.pattern));
      } else if (this.field.maxLength) {
        control = new UntypedFormControl('', Validators.maxLength(this.field.maxLength));
      } else if (this.field.minLength) {
        control = new UntypedFormControl('', Validators.minLength(this.field.minLength));
      } else {
        control = new UntypedFormControl();
      }
    }
    this.inputGroup = new UntypedFormGroup({ [this.field.name]: control });
  }

  inputIsValid(): boolean {
    this.field.isValid = this.inputGroup.valid;
    return this.field.isValid;
  }

  handleValueChange(input: any) {
    this.valueChange.emit(input);
  }
}
