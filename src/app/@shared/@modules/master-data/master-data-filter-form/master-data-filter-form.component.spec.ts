import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterDataFilterFormComponent } from './master-data-filter-form.component';

describe('MasterDataFilterFormComponent', () => {
  let component: MasterDataFilterFormComponent;
  let fixture: ComponentFixture<MasterDataFilterFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MasterDataFilterFormComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterDataFilterFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
