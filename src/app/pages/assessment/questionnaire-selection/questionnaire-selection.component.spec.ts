import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { QuestionnaireSelectionComponent } from './questionnaire-selection.component';

describe('QuestionnaireSelectionComponent', () => {
  let component: QuestionnaireSelectionComponent;
  let fixture: ComponentFixture<QuestionnaireSelectionComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [QuestionnaireSelectionComponent],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionnaireSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
