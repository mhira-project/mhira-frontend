import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { TimeQuestionComponent } from './time-question.component';

describe('TimeQuestionComponent', () => {
  let component: TimeQuestionComponent;
  let fixture: ComponentFixture<TimeQuestionComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [TimeQuestionComponent],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
