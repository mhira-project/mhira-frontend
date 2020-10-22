import { Component, OnInit } from '@angular/core';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { userForms } from '@app/pages/administration/user-management/@forms/form';
import { Router } from '@angular/router';
import { ModalType } from '@app/pages/administration/user-management/modal.type';
import { Form } from '@shared/components/field-generator/formt';
import { User } from '@app/pages/administration/administration.interfaces';
import { userTable } from '@app/pages/administration/user-management/users.table';
import { UserService } from '@app/pages/administration/@services/user.service';
import { environment } from '@env/environment';
import { UserUpdatePasswordInput } from '@app/pages/administration/user-management/user-form/user-update-password.type';
import { Paging } from '@shared/@types/paging';

const CryptoJS = require('crypto-js');
const moment = require('moment');

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss'],
})
export class UserManagementComponent implements OnInit {
  isLoading = false;
  showModal = false;
  modalType: ModalType;
  changePasswordModal: ModalType = {
    title: 'Change Password',
    type: 'changePassword',
  };
  filter: any = {};
  paging: Paging = {
    first: 10,
  };
  user: User = {
    address: '',
    gender: '',
    birthDate: '',
    email: '',
    firstName: '',
    middleName: '',
    lastName: '',
    phone: '',
    id: 0,
  };
  users: User[] = [];
  usersTable: { columns: any[]; rows: User[] } = {
    columns: userTable.columns,
    rows: [],
  };
  actions = userTable.actions;
  selectedUserIndex = -1;
  errors: any[] = [];
  changePasswordForm: Form = userForms.changeUserPassword;
  filterForm: Form = userForms.userFilter;
  loadingMessage: any;
  showFilterPanel = false;

  constructor(
    private modalService: NzModalService,
    private message: NzMessageService,
    private router: Router,
    private usersService: UserService
  ) {}

  ngOnInit(): void {
    this.getUsers(this.paging);
  }

  getUsers(paging?: Paging) {
    this.isLoading = true;
    this.users = [];
    const rows: User[] = [];
    this.usersService.getUsers(this.filter, paging).subscribe(
      async ({ data }) => {
        const usersData = data.users;
        usersData.edges.map((user: any) => {
          const row = Object.assign({}, user.node);
          const settings = JSON.parse(localStorage.getItem('settings'));
          row.updatedAt = row.updatedAt ? moment(row.updatedAt).format(settings.dateTimeFormat) : '';
          row.birthDate = row.birthDate ? moment(row.birthDate).format(settings.dateFormat) : '';
          rows.push(row);
          this.users.push(user.node);
        });
        this.usersTable.rows = rows;
        this.paging = data.users.pageInfo;
        this.isLoading = false;
      },
      (error) => {
        this.errors = error.graphQLErrors.map((x: { message: any }) => x.message);
        this.isLoading = false;
      }
    );
  }

  deleteUser(index: any) {
    this.isLoading = true;
    const user = this.users[index];
    this.usersService.deleteUser(user).subscribe(
      async ({ data }) => {
        const deletedIndex = this.users.findIndex((_user) => _user.id === user.id);
        this.users.splice(deletedIndex, 1);
        this.usersTable.rows = this.users;
        this.isLoading = false;
        this.getUsers(this.paging);
      },
      (error) => {
        this.isLoading = false;
      }
    );
  }

  onCustomActionEvent(event: any) {
    this.user = this.usersTable.rows[event.index];
    this.selectedUserIndex = event.index;
    switch (event.action.type) {
      case 'changePassword':
        this.showModal = true;
        this.modalType = Object.assign({}, this.changePasswordModal);
        this.modalType.title = `${this.modalType.title} for ${this.user.firstName} ${this.user.lastName}`;
        break;
      case 'delete':
        this.modalService.confirm({
          nzTitle: 'Confirm',
          nzContent: `Are you sure you want to delete ${this.user.firstName} ${this.user.lastName}`,
          nzOkText: 'Delete',
          nzOnOk: () => this.deleteUser(event.index),
          nzCancelText: 'Cancel',
        });
        break;
    }
  }

  handleRowClick(event: any) {
    const dataString = CryptoJS.AES.encrypt(JSON.stringify(this.users[event.index]), environment.secretKey).toString();
    this.router.navigate(['/mhira/administration/user-management/form'], {
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

  handleCancel() {
    this.showModal = false;
  }

  handleOk() {
    this.showModal = false;
  }

  onCreateUser() {
    this.router.navigate([`/mhira/administration/user-management/form`]);
  }

  onFormSubmit($event: any) {}

  onError(errors: any) {
    if (errors.length > 0) {
      for (const error of errors) {
        this.message.create('error', `${error}`);
      }
    } else {
      this.message.create('error', `${errors['error']['message']}`);
    }
  }

  showFilterPanelAction() {
    this.showFilterPanel = true;
  }

  closeFilterPanel() {
    this.showFilterPanel = false;
  }

  filterEvent(data: any) {
    this.paging = { first: 10 };
    this.filter = data;
    this.getUsers(this.paging);
  }
}
