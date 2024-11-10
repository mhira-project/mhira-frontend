import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { SystemConfigurationComponent } from './system-configuration.component';

describe('SystemConfigurationComponent', () => {
  let component: SystemConfigurationComponent;
  let fixture: ComponentFixture<SystemConfigurationComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [SystemConfigurationComponent],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(SystemConfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
