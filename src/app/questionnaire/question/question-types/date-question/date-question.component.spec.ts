import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DateQuestionComponent } from './date-question.component';

describe('DateQuestionComponent', () => {
  let component: DateQuestionComponent;
  let fixture: ComponentFixture<DateQuestionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DateQuestionComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DateQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
