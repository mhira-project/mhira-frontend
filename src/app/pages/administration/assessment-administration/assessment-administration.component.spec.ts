import { ComponentFixture, TestBed,waitForAsync } from '@angular/core/testing';
import { AssessmentAdministrationComponent } from './assessment-administration.component';

describe('AssessmentAdministrationComponent', () => {
  let component: AssessmentAdministrationComponent;
  let fixture: ComponentFixture<AssessmentAdministrationComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [AssessmentAdministrationComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssessmentAdministrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
