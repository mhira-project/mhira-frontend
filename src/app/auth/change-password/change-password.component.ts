import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@app/auth/auth.service';
import { UserChangePasswordInput } from '@app/pages/user-management/user-form/user-update-password.type';
import { UsersService } from '@app/pages/user-management/@services/users.service';
import { User } from '@app/pages/user-management/@types/user';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
})
export class ChangePasswordComponent implements OnInit {
  validateForm!: FormGroup;
  isLoading = false;
  hasErrors = false;
  errors: string[] = [];
  passwordVisible = false;
  currentPassword = false;
  repeatPassword = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private usersService: UsersService
  ) {}

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      currentPassword: [null, [Validators.required]],
      repeatPassword: [null, [Validators.required]],
      password: [null, [Validators.required]],
    });
  }

  changePassword(form: any) {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      const user: User = JSON.parse(userStr);
      this.hasErrors = false;
      this.errors = [];
      this.isLoading = true;
      const inputs: UserChangePasswordInput = {
        currentPassword: form.currentPassword,
        newPassword: form.password,
        newPasswordConfirmation: form.repeatPassword,
      };
      this.usersService.changeUserPassword(inputs).subscribe(
        async ({ data }) => {
          this.isLoading = false;
          this.logout();
        },
        (error) => {
          this.isLoading = false;
          this.hasErrors = true;
          const graphError = error.graphQLErrors.map((x: any) => x.message);
          this.onError(graphError);
        }
      );
    }
  }

  logout() {
    this.authService.logout().subscribe(
      async ({ data }) => {
        this.isLoading = false;
        const items = ['auth_app_token', 'user', 'settings', 'tabs', 'activeTabIndex', 'permissions'];
        for (const item of items) {
          localStorage.removeItem(item);
        }
        this.router.navigate(['/auth/login']);
      },
      (error) => {
        this.isLoading = false;
      }
    );
  }

  onError(errors: any) {
    if (errors.length > 0) {
      for (const error of errors) {
        this.errors.push(error);
      }
    } else {
      this.errors.push(`${errors.error.message}`);
    }
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
        currentPassword: this.validateForm.controls.currentPassword.value,
        repeatPassword: this.validateForm.controls.repeatPassword.value,
        password: this.validateForm.controls.password.value,
      };
      this.changePassword(credentials);
    }
  }
}
