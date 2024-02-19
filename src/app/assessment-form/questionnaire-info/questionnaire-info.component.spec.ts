import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { QuestionnaireInfoComponent } from './questionnaire-info.component';

describe('QuestionnaireInfoComponent', () => {
  let component: QuestionnaireInfoComponent;
  let fixture: ComponentFixture<QuestionnaireInfoComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [QuestionnaireInfoComponent],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionnaireInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
