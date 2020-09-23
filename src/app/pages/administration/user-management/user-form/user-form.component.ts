import { ChangeDetectorRef, Component, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, NavigationStart, Router } from '@angular/router';
import { userForms } from '@app/pages/administration/user-management/@forms/form';
import { Form } from '@shared/components/field-generator/formt';
import { TopTabsDataService } from '@shared/services/tabs-data.service';
import * as moment from 'moment';
import { User } from '@app/pages/administration/administration.interfaces';
import { UserService } from '@app/pages/administration/@services/user.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { TabInterface } from '@app/@layout/vertical/header/tabs/tab.interface';
import { environment } from '@env/environment';
import { UserUpdatePasswordInput } from './user-update-password.type';
const CryptoJS = require('crypto-js');
@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
})
export class UserFormComponent implements OnInit, OnDestroy {
  user: User;
  isLoading = false;
  loadingMessage = '';
  profileFields: Form = userForms.userProfile;
  userRolesPermissionsFields: Form = userForms.userRolesPermissions;
  changeUserPasswordFields: Form = userForms.changeUserPassword;
  tabSub: any;
  routeSub: any;
  tabIndexSub: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private cd: ChangeDetectorRef,
    private tabsDataService: TopTabsDataService,
    private usersService: UserService,
    private message: NzMessageService
  ) {}

  ngOnInit(): void {
    this.getUserFromUrl();
  }
  ngOnDestroy() {
    this.routeSub.unsubscribe();
    this.tabSub.unsubscribe();
    this.tabIndexSub.unsubscribe();
  }

  getUserFromUrl(): void {
    this.routeSub = this.activatedRoute.queryParams.subscribe((params) => {
      if (params.user) {
        const bytes = CryptoJS.AES.decrypt(params.user, environment.secretKey);
        const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
        this.user = decryptedData;
        this.profileFields = userForms.userProfileEdit;
        this.onChangeUser();
        this.profileFields.groups.map((group) => {
          group.fields.map((field) => {
            field.value = decryptedData[field.name];
          });
        });
      }
    });
  }

  onChangeUser() {
    this.tabIndexSub = this.tabsDataService.selectedIndex.subscribe((index) => {
      if (index !== -1) {
        this.tabSub = this.tabsDataService.tabs.subscribe((tabs) => {
          if (this.user) {
            tabs[index]['title'] = `${this.user.firstName} ${this.user.lastName}`;
          } else {
            tabs[index]['title'] = 'New User';
          }
        });
      }
    });
  }
  createUser(user: User) {
    this.isLoading = true;
    this.loadingMessage = `Creating user ${user.firstName} ${user.lastName}`;
    this.usersService.createUser(user).subscribe(
      async ({ data }) => {
        const userData = data['createUser'];
        userData.updatedAt = userData.updatedAt ? moment(userData.updatedAt).format('DD-MM-YYYY HH:mm') : '';
        userData.birthDate = userData.birthDate ? moment(userData.birthDate).format('DD-MM-YYYY HH:mm') : '';
        this.isLoading = false;
        this.loadingMessage = '';
        //close this tab
        this.user = userData;
        //open another
        this.onChangeUser();
      },
      (error) => {
        this.isLoading = false;
        this.loadingMessage = '';
      }
    );
  }

  updateUser(user: User) {
    this.isLoading = true;
    this.loadingMessage = `Updating user ${user.firstName} ${user.lastName}`;
    this.usersService.updateUser(user).subscribe(
      async ({ data }) => {
        const userData = data['updateUser'];
        const color = userData.active
          ? 'ng-trigger ng-trigger-fadeMotion ant-tag-green ant-tag'
          : 'ng-trigger ng-trigger-fadeMotion ant-tag-red ant-tag';

        const active = userData.active ? 'active' : 'inactive';

        userData.updatedAt = userData.updatedAt ? moment(userData.updatedAt).format('DD-MM-YYYY HH:mm') : '';
        userData.birthDate = userData.birthDate ? moment(userData.birthDate).format('DD-MM-YYYY HH:mm') : '';
        userData.active = `<nz-tag class="${color}">${active}</nz-tag>`;

        // const updatedIndex = this.users.findIndex((_user) => _user.id === user.id);

        this.isLoading = false;
        this.loadingMessage = '';
        this.message.create('success', `User has successfully been created`);
      },
      (error) => {
        this.isLoading = false;
        this.loadingMessage = '';
      }
    );
  }
  submitForm(form: any): void {
    if (this.user) {
      form.id = this.user.id;
      this.updateUser(form);
    } else {
      this.createUser(form);
    }
  }

  changePassword(form: any) {
    if (this.user.id) {
      this.isLoading = true;
      this.loadingMessage = `Updating user ${this.user.firstName} ${this.user.lastName}`;
      const inputs: UserUpdatePasswordInput = {
        id: this.user.id,
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

  onError(errors: any) {
    if (errors.length > 0) {
      for (const error of errors) {
        this.message.create('error', `${error}`);
      }
    } else {
      this.message.create('error', `${errors['error']['message']}`);
    }
  }
}
