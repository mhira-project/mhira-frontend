import {  ComponentFixture, TestBed,waitForAsync } from '@angular/core/testing';
import { CreateQuestionnaireBundleComponent } from './create-questionnaire-bundle.component';

describe('CreateQuestionnaireBundleComponent', () => {
  let component: CreateQuestionnaireBundleComponent;
  let fixture: ComponentFixture<CreateQuestionnaireBundleComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateQuestionnaireBundleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateQuestionnaireBundleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
