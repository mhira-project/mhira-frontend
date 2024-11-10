import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CaregiverListComponent } from './caregiver-list.component';

describe('CaregiverListComponent', () => {
  let component: CaregiverListComponent;
  let fixture: ComponentFixture<CaregiverListComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [CaregiverListComponent],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(CaregiverListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
