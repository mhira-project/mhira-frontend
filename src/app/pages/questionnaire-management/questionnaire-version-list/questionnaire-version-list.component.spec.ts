import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { QuestionnaireVersionListComponent } from './questionnaire-version-list.component';

describe('QuestionnaireVersionListComponent', () => {
  let component: QuestionnaireVersionListComponent;
  let fixture: ComponentFixture<QuestionnaireVersionListComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [QuestionnaireVersionListComponent],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionnaireVersionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
