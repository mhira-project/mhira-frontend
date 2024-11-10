import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { QuestionnaireFormComponent } from './questionnaire-form.component';

describe('QuestionnaireFormComponent', () => {
  let component: QuestionnaireFormComponent;
  let fixture: ComponentFixture<QuestionnaireFormComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [QuestionnaireFormComponent],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionnaireFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
