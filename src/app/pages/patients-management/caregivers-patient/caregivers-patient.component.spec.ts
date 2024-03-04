import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CaregiversPatientComponent } from './caregivers-patient.component';

describe('CaregiversPatientComponent', () => {
  let component: CaregiversPatientComponent;
  let fixture: ComponentFixture<CaregiversPatientComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [CaregiversPatientComponent],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(CaregiversPatientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
