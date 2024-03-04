import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { MasterDataFilterFormComponent } from './master-data-filter-form.component';

describe('MasterDataFilterFormComponent', () => {
  let component: MasterDataFilterFormComponent<any>;
  let fixture: ComponentFixture<MasterDataFilterFormComponent<any>>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [MasterDataFilterFormComponent],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterDataFilterFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
