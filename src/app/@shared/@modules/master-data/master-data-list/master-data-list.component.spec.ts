import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { MasterDataListComponent } from './master-data-list.component';

describe('MasterDataListComponent', () => {
  let component: MasterDataListComponent<any>;
  let fixture: ComponentFixture<MasterDataListComponent<any>>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [MasterDataListComponent],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterDataListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
