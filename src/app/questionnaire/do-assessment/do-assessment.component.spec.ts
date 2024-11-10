import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { DoAssessmentComponent } from './do-assessment.component';

describe('DoAssessmentComponent', () => {
  let component: DoAssessmentComponent;
  let fixture: ComponentFixture<DoAssessmentComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [DoAssessmentComponent],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(DoAssessmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
