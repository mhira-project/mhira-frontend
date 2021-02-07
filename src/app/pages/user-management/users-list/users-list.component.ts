import { Component, OnInit } from '@angular/core';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { userForms } from '@app/pages/user-management/@forms/user.form';
import { Router } from '@angular/router';
import { ModalType } from '@app/pages/user-management/users-list/modal.type';
import { Form } from '@shared/components/form/@types/form';
import { User } from '@app/pages/user-management/@types/user';
import { userTable } from '@app/pages/user-management/@tables/users.table';
import { UsersService } from '@app/pages/user-management/@services/users.service';
import { environment } from '@env/environment';
import { UserUpdatePasswordInput } from '@app/pages/user-management/user-form/user-update-password.type';
import { Paging } from '@shared/@types/paging';
import { DateService } from '@shared/services/date.service';
import { AppPermissionsService } from '@shared/services/app-permissions.service';

const CryptoJS = require('crypto-js');

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
})
export class UsersListComponent implements OnInit {
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
  pageInfo: any;
  user: User = {
    username: '',
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
  updatePasswordForm: Form = userForms.updateUserPassword;
  filterForm: Form = userForms.userFilter;
  loadingMessage: any;
  showFilterPanel = false;

  constructor(
    private modalService: NzModalService,
    private message: NzMessageService,
    private dateService: DateService,
    private router: Router,
    private usersService: UsersService,
    public perms: AppPermissionsService
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
          row.updatedAt = row.updatedAt ? this.dateService.formatDate(row.updatedAt) : '';
          row.birthDate = row.birthDate ? this.dateService.formatDate(row.birthDate) : '';
          const color = row.active
            ? 'ng-trigger ng-trigger-fadeMotion ant-tag-green ant-tag'
            : 'ng-trigger ng-trigger-fadeMotion ant-tag-red ant-tag';
          const active = row.active ? 'ACTIVE' : 'INACTIVE';

          row.active = `<nz-tag class="${color}">${active}</nz-tag>`;
          row.roles = '';
          user.node.roles.forEach((role: { name: any }) => {
            row.roles += `<nz-tag class="ant-tag-blue ant-tag ml-5">${role.name}</nz-tag>`;
          });

          row.departments = '';
          user.node.departments.forEach((department: { name: any }) => {
            row.departments += `<nz-tag class="ant-tag-cyan ant-tag ml-5">${department.name}</nz-tag>`;
          });
          rows.push(row);
          this.users.push(user.node);
        });
        this.usersTable.rows = rows;
        this.paging.after = data.users.pageInfo.endCursor;
        this.paging.before = data.users.pageInfo.startCursor;
        this.pageInfo = data.users.pageInfo;
        this.isLoading = false;
      },
      (error) => {
        this.errors = error.graphQLErrors.map((x: { message: any }) => x.message);
        this.isLoading = false;
      }
    );
  }

  navigatePages(direction: string, pageSize: number = 10) {
    switch (direction) {
      case 'next':
        this.paging.before = undefined;
        this.paging.first = pageSize;
        this.paging.last = undefined;
        break;
      case 'previous':
        this.paging.after = undefined;
        this.paging.first = undefined;
        this.paging.last = pageSize;
        break;
    }
    this.getUsers(this.paging);
  }

  deleteUser(index: any) {
    this.isLoading = true;
    const user = this.users[index];
    this.usersService.deleteUser(user).subscribe(
      async ({ data }) => {
        const deletedIndex = this.users.findIndex((_user) => _user.id === user.id);
        this.users.splice(deletedIndex, 1);
        this.usersTable.rows.splice(deletedIndex, 1);
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
        this.modalType.title = `${this.modalType.title} for ${this.user.username}: ${this.user.firstName} ${this.user.lastName}`;
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
    this.router.navigate(['/mhira/user-management/user-form'], {
      state: {
        title: `${this.users[event.index].firstName} ${this.users[event.index].lastName}`,
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

  handleCancel() {
    this.updatePasswordForm.groups.map((group) => {
      group.fields.map((field) => {
        field.value = '';
      });
    });
    this.showModal = false;
  }

  handleOk() {
    this.showModal = false;
  }

  onCreateUser() {
    this.router.navigate([`/mhira/user-management/user-form`]);
  }

  onFormSubmit($event: any) {}

  onError(errors: any) {
    if (errors.length > 0) {
      for (const error of errors) {
        this.message.create('error', `${error}`);
      }
    } else {
      this.message.create('error', `${errors.error.message}`);
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
