import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { SelectQuestionComponent } from './select-question.component';

describe('SelectQuestionComponent', () => {
  let component: SelectQuestionComponent;
  let fixture: ComponentFixture<SelectQuestionComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [SelectQuestionComponent],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
