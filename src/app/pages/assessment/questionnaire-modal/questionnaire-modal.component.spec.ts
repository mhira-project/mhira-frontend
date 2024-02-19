import { ComponentFixture, TestBed,waitForAsync } from '@angular/core/testing';
import { QuestionnaireModalComponent } from './questionnaire-modal.component';

describe('QuestionnaireModalComponent', () => {
  let component: QuestionnaireModalComponent;
  let fixture: ComponentFixture<QuestionnaireModalComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [QuestionnaireModalComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionnaireModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
