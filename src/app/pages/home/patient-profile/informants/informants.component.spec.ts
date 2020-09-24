import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InformantsComponent } from './informants.component';

describe('InformantsComponent', () => {
  let component: InformantsComponent;
  let fixture: ComponentFixture<InformantsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [InformantsComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InformantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
