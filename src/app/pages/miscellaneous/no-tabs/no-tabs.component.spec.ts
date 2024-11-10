import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoTabsComponent } from './no-tabs.component';

describe('NoTabsComponent', () => {
  let component: NoTabsComponent;
  let fixture: ComponentFixture<NoTabsComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [NoTabsComponent],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(NoTabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
