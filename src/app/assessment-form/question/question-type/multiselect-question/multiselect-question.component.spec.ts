import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiselectQuestionComponent } from './multiselect-question.component';

describe('MultiselectQuestionComponent', () => {
  let component: MultiselectQuestionComponent;
  let fixture: ComponentFixture<MultiselectQuestionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MultiselectQuestionComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MultiselectQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
