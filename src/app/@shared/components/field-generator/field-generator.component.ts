import { Component, OnInit, OnDestroy, Input, EventEmitter, Output } from '@angular/core';
import { FieldType } from './field.type';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Form } from '@shared/components/field-generator/formt';
import { Subject, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-field-generator',
  templateUrl: './field-generator.component.html',
  styleUrls: ['./field-generator.component.scss'],
})
export class FieldGeneratorComponent implements OnInit, OnDestroy {
  @Input() form: Form;
  @Input() isLoading = false;
  @Input() loadingMessage = '';
  @Output() searchOptions: EventEmitter<any> = new EventEmitter<any>();
  @Output() submitForm: EventEmitter<any> = new EventEmitter<any>();
  @Output() inputChange: EventEmitter<any> = new EventEmitter<any>();
  formGroup: FormGroup;
  currentSearchedField: FieldType;

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
    this.createForm();
  }

  ngOnDestroy(): void {
    this.optionsSearchSubscription.unsubscribe();
  }

  createForm(): void {
    const formControls = {};
    for (const group of this.form.groups) {
      for (const field of group.fields) {
        if (field.isRequired) {
          if (field.pattern) {
            formControls[field.name] = new FormControl('', [Validators.required, Validators.pattern(field.pattern)]);
          } else if (field.maxLength) {
            formControls[field.name] = new FormControl('', [
              Validators.required,
              Validators.maxLength(field.maxLength),
            ]);
          } else if (field.minLength) {
            formControls[field.name] = new FormControl('', [
              Validators.required,
              Validators.minLength(field.minLength),
            ]);
          } else {
            formControls[field.name] = new FormControl('', Validators.required);
          }
        } else {
          if (field.pattern) {
            formControls[field.name] = new FormControl('', Validators.pattern(field.pattern));
          } else if (field.maxLength) {
            formControls[field.name] = new FormControl('', Validators.maxLength(field.maxLength));
          } else if (field.minLength) {
            formControls[field.name] = new FormControl('', Validators.minLength(field.minLength));
          } else {
            formControls[field.name] = new FormControl();
          }
        }
      }
    }
    this.formGroup = new FormGroup(formControls);
  }

  search(value: string): void {
    this.searchOptions.emit({ field: this.currentSearchedField, keyword: value });
  }

  handleSubmitForm() {
    if (this.formGroup.invalid) {
      return;
    }
    this.submitForm.emit(this.formGroup.value);
  }

  handleInputChange(field: FieldType, event: any) {
    if (event) {
      if (field.type === 'checkBox') {
        this.parseCheckBoxValues(event, field);
        return;
      }

      if (field.type === 'select' || field.type === 'search' || field.type === 'radio') {
        this.inputChange.emit({ name: field.name, value: event });
        return;
      }
      this.inputChange.emit({ name: field.name, value: event.target.value });
    }
  }

  parseCheckBoxValues(options: { value: number | string; label: string; checked: boolean }[], field: any): void {
    for (const option of options) {
      const index = field.value.indexOf(option.value);
      if (option.checked) {
        if (index === -1) {
          field.value.push(option.value);
        }
      } else {
        if (index !== -1) {
          field.value.splice(index, 1);
        }
      }
    }
    this.inputChange.emit({ title: field.title, value: field.value });
  }
}
