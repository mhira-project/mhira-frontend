import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CoreModule } from '@core';
import { AuthService, CredentialsService } from '../index';
import { MockAuthenticationService } from '../authentication.service.mock';
import { MockCredentialsService } from '../credentials.service.mock';
import { I18nModule } from '../../i18n/index';
import { ChangePasswordComponent } from './change-password.component';

describe('LoginComponent', () => {
  let component: ChangePasswordComponent;
  let fixture: ComponentFixture<ChangePasswordComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [
          NgbModule,
          RouterTestingModule,
          TranslateModule.forRoot(),
          I18nModule,
          ReactiveFormsModule,
          CoreModule,
        ],
        declarations: [ChangePasswordComponent],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangePasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
