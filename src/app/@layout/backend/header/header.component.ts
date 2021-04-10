import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '@app/auth/auth.service';
import { Router } from '@angular/router';
import { environment } from '@env/environment';
import { User } from '@app/pages/user-management/@types/user';
import { Form } from '@shared/components/form/@types/form';
import { userForms } from '@app/pages/user-management/@forms/user.form';
import { UserChangePasswordInput } from '@app/pages/user-management/user-form/user-update-password.type';
import { NzMessageService } from 'ng-zorro-antd';
import { UsersService } from '@app/pages/user-management/@services/users.service';
import { FormComponent } from '@shared/components/form/form.component';
import { FieldGroup } from '@shared/components/form/@types/field.group';

const CryptoJS = require('crypto-js');

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @ViewChild(FormComponent) child: FormComponent;
  isOkLoading = false;
  user: User;
  notificationList: any = [];
  changePasswordModal = false;
  loadingMessage = '';
  changePasswordForm: Form = userForms.changeUserPassword;
  isLoading = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private usersService: UsersService,
    private message: NzMessageService
  ) {}

  ngOnInit(): void {
    this.getUser();
  }

  getUser() {
    this.user = JSON.parse(localStorage.getItem('user'));
  }

  clickChangePassword() {
    this.child.handleSubmitForm();
  }

  editUserProfile() {
    const dataString = CryptoJS.AES.encrypt(JSON.stringify(this.user), environment.secretKey).toString();
    this.router.navigate(['/mhira/user-management/user-form'], {
      state: {
        title: `${this.user.firstName} ${this.user.lastName}`,
      },
      queryParams: {
        user: dataString,
      },
    });
  }

  changePassword(form: any) {
    if (this.user.id) {
      this.isLoading = true;
      this.loadingMessage = `Updating user ${this.user.firstName} ${this.user.lastName}`;
      const inputs: UserChangePasswordInput = {
        currentPassword: form.newPassword,
        newPassword: form.newPassword,
        newPasswordConfirmation: form.newPasswordConfirmation,
      };
      this.usersService.changeUserPassword(inputs).subscribe(
        async ({ data }) => {
          this.isLoading = false;
          this.loadingMessage = '';
          this.message.create('success', `Password has successfully been changed`);
        },
        (error) => {
          this.isLoading = false;
          this.loadingMessage = '';
          const graphError = error.graphQLErrors.map((x: any) => x.message);
          this.onError(graphError);
        }
      );
    }
  }

  logout() {
    this.authService.logout().subscribe(
      async ({ data }) => {
        this.isOkLoading = false;
        const items = ['auth_app_token', 'user', 'settings', 'tabs', 'activeTabIndex', 'permissions'];
        for (const item of items) {
          localStorage.removeItem(item);
        }
        this.router.navigate(['/auth/login']);
      },
      (error) => {
        this.isOkLoading = false;
      }
    );
  }

  handleCancel() {
    this.changePasswordModal = false;
    this.changePasswordForm.groups.forEach((group: FieldGroup) => {
      group.fields.find((field) => {
        field.value = null;
      });
    });
  }

  showChangePasswordModal() {
    this.changePasswordModal = true;
  }

  onError(errors: any) {
    if (errors.length > 0) {
      for (const error of errors) {
        this.message.create('error', `${error}`);
      }
    } else {
      this.message.create('error', `${errors.error.message}`);
    }
  }
}
