import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChoiceQuestionComponent } from './choice-question.component';

describe('ChoiceQuestionComponent', () => {
  let component: ChoiceQuestionComponent;
  let fixture: ComponentFixture<ChoiceQuestionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ChoiceQuestionComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChoiceQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
