import { Component, OnInit, OnDestroy, Input, EventEmitter, Output } from '@angular/core';
import { Field } from './@types/field';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Form } from '@shared/components/form/@types/form';
import { Subject, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit, OnDestroy {
  @Input() form: Form;
  @Input() isLoading = false;
  @Input() loadingMessage = '';
  @Input() inputMode = true;
  @Input() showCancelButton = true;
  @Input() showSubmitButton = true;
  @Input() showEditButton = true;
  @Output() searchOptions: EventEmitter<any> = new EventEmitter<any>();
  @Output() submitForm: EventEmitter<any> = new EventEmitter<any>();
  @Output() inputChange: EventEmitter<any> = new EventEmitter<any>();
  formGroup: FormGroup;
  currentSearchedField: Field;

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
        let control: FormControl | FormGroup;
        if (field.isRequired) {
          if (field.pattern) {
            control = new FormControl('', [Validators.required, Validators.pattern(field.pattern)]);
          } else if (field.maxLength) {
            control = new FormControl('', [Validators.required, Validators.maxLength(field.maxLength)]);
          } else if (field.minLength) {
            control = new FormControl('', [Validators.required, Validators.minLength(field.minLength)]);
          } else {
            control = new FormControl('', Validators.required);
          }
        } else {
          if (field.pattern) {
            control = new FormControl('', Validators.pattern(field.pattern));
          } else if (field.maxLength) {
            control = new FormControl('', Validators.maxLength(field.maxLength));
          } else if (field.minLength) {
            control = new FormControl('', Validators.minLength(field.minLength));
          } else {
            control = new FormControl();
          }
        }

        if (field.isArray) {
          const nameParts = field.name.split('.');
          if (formControls[nameParts[0]]) {
            formControls[nameParts[0]].addControl(nameParts[1], control);
          } else {
            console.log('not defined');
            formControls[nameParts[0]] = new FormGroup({
              [nameParts[1]]: control,
            });
          }
          continue;
        }
        formControls[field.name] = control;
      }
    }
    this.formGroup = new FormGroup(formControls);
    console.log(this.formGroup);
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

  toggleEdit() {
    this.inputMode = !this.inputMode;
  }

  handleInputChange(field: Field, event: any) {
    if (event || event === false) {
      if (field.type === 'checkBox') {
        this.parseCheckBoxValues(event, field);
        return;
      }
      if (field.type === 'dateRange') {
        this.inputChange.emit({ name: field.name, value: field.value });
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
