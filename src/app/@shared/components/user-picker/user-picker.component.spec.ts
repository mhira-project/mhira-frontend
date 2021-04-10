import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserPickerComponent } from './user-picker.component';

describe('UserPickerComponent', () => {
  let component: UserPickerComponent;
  let fixture: ComponentFixture<UserPickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UserPickerComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
