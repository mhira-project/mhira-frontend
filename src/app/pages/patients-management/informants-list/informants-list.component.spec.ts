import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InformantsListComponent } from './informants-list.component';

describe('CampaignsListComponent', () => {
  let component: InformantsListComponent;
  let fixture: ComponentFixture<InformantsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [InformantsListComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InformantsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
