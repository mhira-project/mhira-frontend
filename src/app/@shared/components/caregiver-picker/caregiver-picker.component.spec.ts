import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CaregiverPickerComponent } from './caregiver-picker.component';

describe('CaregiverPickerComponent', () => {
  let component: CaregiverPickerComponent;
  let fixture: ComponentFixture<CaregiverPickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CaregiverPickerComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CaregiverPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
