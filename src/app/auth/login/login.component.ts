import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@app/auth/auth.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { version } from '../../../../package.json';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  validateForm!: FormGroup;
  isLoading = false;
  hasErrors = false;
  errors: string[] = [];
  passwordVisible = false;
  version: string = version;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private notification: NzNotificationService
  ) {}

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      identifier: [null, [Validators.required]],
      password: [null, [Validators.required]],
    });
  }

  signIn(credentials: any) {
    this.hasErrors = false;
    this.errors = [];
    this.isLoading = true;
    this.authService.login(credentials).subscribe(
      async ({ data }) => {
        localStorage.setItem(
          'auth_app_token',
          JSON.stringify({
            accessToken: data.login.accessToken,
            refreshToken: data.login.refreshToken,
          })
        );
        localStorage.setItem('user', JSON.stringify(data.login.user));
        this.getSettings();
        this.getUserPermissions();
        this.isLoading = false;
        if (data?.login?.user?.passwordChangeRequired) {
          this.router.navigate(['/auth/change-password']);
        } else {
          this.router.navigate(['/']);
        }
      },
      (error) => {
        this.hasErrors = true;
        for (const gqlError of error.graphQLErrors) {
          this.errors.push(gqlError.message);
        }
        this.isLoading = false;
      }
    );
  }

  forgotPassword() {
    this.notification
      .blank('Do you need to change Password?', 'To reset your password, please contact the user manager.')
      .onClick.subscribe(() => {
        console.log('notification clicked!');
      });
  }
  getUserPermissions() {
    this.authService.getUserPermissions().subscribe(
      ({ data }) => {
        sessionStorage.setItem('permissions', JSON.stringify(data.userPermissionGrants));
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getSettings() {
    this.authService.getSettings().subscribe(
      ({ data }) => {
        localStorage.setItem('settings', JSON.stringify(data.settings));
      },
      (error) => {
        console.log(error);
      }
    );
  }

  submitForm(): void {
    if (this.validateForm.status === 'VALID') {
      const credentials = {
        identifier: this.validateForm.controls.identifier.value,
        password: this.validateForm.controls.password.value,
      };
      this.signIn(credentials);
    }
  }
}
