import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { WYSIWYGInputComponent } from './wysiwyg-input.component';

describe('WysiwygInputComponent', () => {
  let component: WYSIWYGInputComponent;
  let fixture: ComponentFixture<WYSIWYGInputComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [WYSIWYGInputComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WYSIWYGInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
