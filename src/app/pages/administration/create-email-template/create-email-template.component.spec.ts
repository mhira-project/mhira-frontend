import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEmailTemplateComponent } from './create-email-template.component';

describe('CreateEmailTemplateComponent', () => {
  let component: CreateEmailTemplateComponent;
  let fixture: ComponentFixture<CreateEmailTemplateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateEmailTemplateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateEmailTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
