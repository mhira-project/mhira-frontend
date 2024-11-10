import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { CaseManagersComponent } from './case-managers.component';

describe('CaseManagersComponent', () => {
  let component: CaseManagersComponent;
  let fixture: ComponentFixture<CaseManagersComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [CaseManagersComponent],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(CaseManagersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
