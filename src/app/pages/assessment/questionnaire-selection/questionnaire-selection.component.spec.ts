import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionnaireSelectionComponent } from './questionnaire-selection.component';

describe('QuestionnaireSelectionComponent', () => {
  let component: QuestionnaireSelectionComponent;
  let fixture: ComponentFixture<QuestionnaireSelectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [QuestionnaireSelectionComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionnaireSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
