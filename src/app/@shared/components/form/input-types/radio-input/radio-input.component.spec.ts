import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { RadioInputComponent } from './radio-input.component';

describe('RadioInputComponent', () => {
  let component: RadioInputComponent;
  let fixture: ComponentFixture<RadioInputComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [RadioInputComponent],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(RadioInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
