import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FieldGeneratorComponent } from './field-generator.component';

describe('FieldGeneratorComponent', () => {
  let component: FieldGeneratorComponent;
  let fixture: ComponentFixture<FieldGeneratorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FieldGeneratorComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FieldGeneratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
