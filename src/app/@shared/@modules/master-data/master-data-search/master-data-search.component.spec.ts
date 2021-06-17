import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MasterDataSearchComponent } from './master-data-search.component';

describe('MasterDataSearchComponent', () => {
  let component: MasterDataSearchComponent;
  let fixture: ComponentFixture<MasterDataSearchComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [MasterDataSearchComponent],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterDataSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
