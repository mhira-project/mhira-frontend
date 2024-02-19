import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { QuestionnaireScriptComponent } from './questionnaire-script.component';

describe('QuestionnaireScriptComponent', () => {
  let component: QuestionnaireScriptComponent;
  let fixture: ComponentFixture<QuestionnaireScriptComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [QuestionnaireScriptComponent],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionnaireScriptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
