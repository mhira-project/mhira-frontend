import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { PlanAssessmentComponent } from './plan-assessment.component';

describe('PlanAssessmentComponent', () => {
  let component: PlanAssessmentComponent;
  let fixture: ComponentFixture<PlanAssessmentComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [PlanAssessmentComponent],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanAssessmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
