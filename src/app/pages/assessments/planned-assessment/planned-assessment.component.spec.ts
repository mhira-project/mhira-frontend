import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlannedAssessmentComponent } from './planned-assessment.component';

describe('PlannedAssessmentComponent', () => {
  let component: PlannedAssessmentComponent;
  let fixture: ComponentFixture<PlannedAssessmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PlannedAssessmentComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlannedAssessmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
