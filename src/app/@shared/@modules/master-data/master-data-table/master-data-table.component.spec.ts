import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { MasterDataTableComponent } from './master-data-table.component';

describe('MasterDataTableComponent', () => {
  let component: MasterDataTableComponent<any>;
  let fixture: ComponentFixture<MasterDataTableComponent<any>>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [MasterDataTableComponent],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterDataTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
