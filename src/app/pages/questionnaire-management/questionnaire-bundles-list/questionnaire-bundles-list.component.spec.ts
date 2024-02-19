import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { QuestionnaireBundlesListComponent } from './questionnaire-bundles-list.component';

describe('QuestionnaireBundlesListComponent', () => {
  let component: QuestionnaireBundlesListComponent;
  let fixture: ComponentFixture<QuestionnaireBundlesListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionnaireBundlesListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionnaireBundlesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
