import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientPickerComponent } from './patient-picker.component';

describe('PatientPickerComponent', () => {
  let component: PatientPickerComponent;
  let fixture: ComponentFixture<PatientPickerComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [PatientPickerComponent],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
