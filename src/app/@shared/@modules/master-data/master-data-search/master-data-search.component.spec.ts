import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterDataSearchComponent } from './master-data-search.component';

describe('MasterDataSearchComponent', () => {
  let component: MasterDataSearchComponent;
  let fixture: ComponentFixture<MasterDataSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MasterDataSearchComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterDataSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
