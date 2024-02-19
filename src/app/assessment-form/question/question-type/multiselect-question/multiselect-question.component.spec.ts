import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { MultiselectQuestionComponent } from './multiselect-question.component';

describe('MultiselectQuestionComponent', () => {
  let component: MultiselectQuestionComponent;
  let fixture: ComponentFixture<MultiselectQuestionComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [MultiselectQuestionComponent],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(MultiselectQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
