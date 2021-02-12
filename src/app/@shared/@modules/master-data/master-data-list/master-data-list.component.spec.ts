import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterDataListComponent } from './master-data-list.component';

describe('MasterDataListComponent', () => {
  let component: MasterDataListComponent;
  let fixture: ComponentFixture<MasterDataListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MasterDataListComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterDataListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
