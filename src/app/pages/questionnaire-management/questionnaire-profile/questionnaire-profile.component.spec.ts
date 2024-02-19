import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { QuestionnaireProfileComponent } from './questionnaire-profile.component';

describe('QuestionnaireProfileComponent', () => {
  let component: QuestionnaireProfileComponent;
  let fixture: ComponentFixture<QuestionnaireProfileComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [QuestionnaireProfileComponent],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionnaireProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
