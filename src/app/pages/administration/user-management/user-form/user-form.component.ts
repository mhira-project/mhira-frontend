import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { userForms } from '@app/pages/administration/user-management/@forms/form';
import { Form } from '@shared/components/field-generator/form';
import { TopTabsDataService } from '@shared/services/tabs-data.service';
import * as moment from 'moment';
import { User } from '@app/pages/administration/administration.interfaces';
import { UserService } from '@app/pages/administration/@services/user.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { environment } from '@env/environment';
import { UserUpdatePasswordInput } from './user-update-password.type';
import { Sorting } from '@shared/@types/sorting';
import { Paging } from '@shared/@types/paging';
import { Filter } from '@shared/@types/filter';
import { RolesService } from '@app/pages/administration/@services/roles.service';
import { Convert } from '@shared/classes/convert';
import { Role } from '@app/pages/administration/@types/role';

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
  profileFields: Form = userForms.userProfileEdit;
  userRolesPermissionsFields: Form = userForms.userRolesPermissions;
  changeUserPasswordFields: Form = userForms.changeUserPassword;
  tabSub: any;
  routeSub: any;
  tabIndexSub: any;
  inputMode = true;
  showCancelButton = false;
  roles: Role[] = [];
  selectedRoles: number[] = [];
  unselectedRoles: number[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private cd: ChangeDetectorRef,
    private tabsDataService: TopTabsDataService,
    private usersService: UserService,
    private message: NzMessageService,
    private rolesService: RolesService
  ) {}

  ngOnInit(): void {
    this.getUserFromUrl();
    this.getRoles();
  }

  ngOnDestroy() {}

  getRoles(params?: { paging?: Paging; filter?: Filter; sorting?: Sorting }) {
    const options: any = [];
    this.roles = [];
    this.rolesService.roles(params).subscribe(
      async ({ data }: any) => {
        data.roles.edges.map((role: any) => {
          const _role = Convert.toRole(role.node);
          this.roles.push(_role);
          options.push({ label: _role.name, value: _role.id });
        });
        this.userRolesPermissionsFields.groups[0].fields[0].options = options;
      },
      (error: any) => {}
    );
  }

  userHasRole(roleId: number): boolean {
    for (const _role of this.user.roles) {
      if (_role.id === roleId) {
        return true;
      }
    }
    return false;
  }

  collectRoles(roles: number[]) {
    const rolesIds: number[] = [];
    this.roles.map((role) => rolesIds.push(role.id));
    this.selectedRoles = roles;
    this.unselectedRoles = rolesIds.filter((id) => !this.selectedRoles.includes(id));
    for (const role of roles) {
      if (this.userHasRole(role)) {
        this.selectedRoles.splice(this.selectedRoles.indexOf(role), role);
      }
    }
  }

  getUserFromUrl(): void {
    this.routeSub = this.activatedRoute.queryParams.subscribe((params) => {
      if (params.user) {
        this.inputMode = false;
        this.showCancelButton = true;
        const bytes = CryptoJS.AES.decrypt(params.user, environment.secretKey);
        const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
        this.user = decryptedData;
        if (this.user.birthDate) {
          this.user.birthDate = decryptedData.birthDate.slice(0, 10);
        }
        this.profileFields = userForms.userProfileEdit;
        // this.onChangeUser();
        this.profileFields.groups.map((group) => {
          group.fields.map((field) => {
            field.value = decryptedData[field.name];
          });
        });
      } else {
        this.user = {
          address: '',
          birthDate: '',
          email: '',
          firstName: '',
          gender: '',
          lastName: '',
          phone: '',
          roles: [],
        };
        this.inputMode = true;
        this.showCancelButton = false;
        this.profileFields.groups.map((group) => {
          group.fields.map((field) => {
            field.value = null;
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
            tabs[index].title = `${this.user.firstName} ${this.user.lastName}`;
          } else {
            tabs[index].title = 'New User';
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
        const userData = data.createUser;
        userData.updatedAt = userData.updatedAt ? moment(userData.updatedAt).format('DD-MM-YYYY HH:mm') : '';
        userData.birthDate = userData.birthDate ? moment(userData.birthDate).format('DD-MM-YYYY HH:mm') : '';
        this.isLoading = false;
        this.loadingMessage = '';
        this.message.create('success', `User has successfully been created`);
        // close this tab
        this.user = userData;
        // open another
        // this.onChangeUser();
      },
      (error) => {
        this.isLoading = false;
        this.loadingMessage = '';
        const graphError = error.graphQLErrors.map((x: any) => x.message);
        this.onError(graphError);
      }
    );
  }

  updateUser(user: User) {
    this.isLoading = true;
    this.loadingMessage = `Updating user ${user.firstName} ${user.lastName}`;
    this.usersService.updateUser(user).subscribe(
      async ({ data }) => {
        const userData = data.updateUser;
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
        this.message.create('success', `User has successfully been updated`);
      },
      (error) => {
        this.isLoading = false;
        this.loadingMessage = '';
        const graphError = error.graphQLErrors.map((x: any) => x.message);
        this.onError(graphError);
      }
    );
  }

  submitRoles() {
    if (this.selectedRoles.length > 0) {
      this.assignRoles();
    }

    if (this.unselectedRoles.length > 0) {
      this.unassignRoles();
    }
  }

  assignRoles() {
    this.isLoading = true;
    this.rolesService.addRolesToUser(this.user.id, this.selectedRoles).subscribe(
      async ({ data }: any) => {
        /*for (const roleId of this.selectedRoles) {
          this.user.roles.map((role) => {
            if (role.id !== roleId) {
              this.roles.map((_role) => {
                if (_role.id === roleId) {
                  this.user.roles.push(_role);
                }
              });
            }
          });
        }*/
        this.isLoading = false;
        this.message.create('success', `the role(s) have been successful assigned to ${this.user.firstName}`);
      },
      (error: any) => {
        this.isLoading = false;
        this.message.create('error', `could not assign role(s) to ${this.user.firstName}`);
      }
    );
  }

  unassignRoles() {
    this.isLoading = true;
    this.rolesService.removeRolesFromUser(this.user.id, this.unselectedRoles).subscribe(
      async ({ data }: any) => {
        this.isLoading = false;
        this.message.create('success', `the role(s) have been successful removed from ${this.user.firstName}`);
      },
      (error: any) => {
        this.isLoading = false;
        this.message.create('error', `could not remove role(s) to ${this.user.firstName}`);
      }
    );
  }

  submitForm(form: any): void {
    if (this.user) {
      form.id = this.user.id;
      this.updateUser(form);
    } else {
      console.log(form);
      if (form.password !== form.passwordConfirmation) {
        this.message.create('error', `Password does not match`);
      } else {
        this.createUser(form);
      }
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
      this.usersService.updateUserPassword(inputs).subscribe(
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
      this.message.create('error', `${errors.error.message}`);
    }
  }
}
