import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckboxQuestionComponent } from './checkbox-question.component';

describe('CheckboxQuestionComponent', () => {
  let component: CheckboxQuestionComponent;
  let fixture: ComponentFixture<CheckboxQuestionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CheckboxQuestionComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckboxQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
