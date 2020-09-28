import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CliniciansComponent } from './clinicians.component';

describe('CliniciansComponent', () => {
  let component: CliniciansComponent;
  let fixture: ComponentFixture<CliniciansComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CliniciansComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CliniciansComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
