import {  ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CaregiverPickerComponent } from './caregiver-picker.component';

describe('CaregiverPickerComponent', () => {
  let component: CaregiverPickerComponent;
  let fixture: ComponentFixture<CaregiverPickerComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [CaregiverPickerComponent],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(CaregiverPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
