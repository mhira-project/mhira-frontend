import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { PatientStatusesComponent } from './patient-statuses.component';

describe('PatientStatusesComponent', () => {
  let component: PatientStatusesComponent;
  let fixture: ComponentFixture<PatientStatusesComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [PatientStatusesComponent],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientStatusesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
