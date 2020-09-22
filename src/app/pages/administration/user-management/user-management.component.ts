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

const CryptoJS = require('crypto-js');
const moment = require('moment');

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss'],
})
export class UserManagementComponent implements OnInit {
  isLoading: boolean = false;
  showModal: boolean = false;
  modalType: ModalType;
  changePasswordModal: ModalType = {
    title: 'Change Password',
    type: 'changePassword',
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

  constructor(
    private modalService: NzModalService,
    private message: NzMessageService,
    private router: Router,
    private usersService: UserService
  ) {}

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    this.isLoading = true;
    this.users = [];
    this.usersService.getUsers().subscribe(
      async ({ data }) => {
        const usersData = data['getUsers'];
        usersData.edges.map((user: any) => {
          const row = Object.assign({}, user.node);
          const color = row.active
            ? 'ng-trigger ng-trigger-fadeMotion ant-tag-green ant-tag'
            : 'ng-trigger ng-trigger-fadeMotion ant-tag-red ant-tag';

          const active = row.active ? 'active' : 'inactive';

          row.updatedAt = row.updatedAt ? moment(row.updatedAt).format('DD-MM-YYYY HH:mm') : '';
          row.birthDate = row.birthDate ? moment(row.birthDate).format('DD-MM-YYYY HH:mm') : '';
          row.active = `<nz-tag class="${color}">${active}</nz-tag>`;
          this.usersTable.rows.push(row);
          this.users.push(user.node);
        });
        this.isLoading = false;
      },
      (error) => {
        this.errors = error.graphQLErrors.map((x: { message: any }) => x.message);
        this.isLoading = false;
      }
    );
  }

  onCustomActionEvent(event: any) {
    this.user = this.usersTable.rows[event.index];
    console.log(this.user);
    this.selectedUserIndex = event.index;
    switch (event.action.type) {
      case 'edit':
        const dataString = CryptoJS.AES.encrypt(
          JSON.stringify(this.users[event.index]),
          environment.secretKey
        ).toString();
        this.router.navigate(['/mhira/administration/user-management/form'], {
          queryParams: { user: dataString },
        });
        break;
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
          nzOnOk: () => {},
          nzCancelText: 'Cancel',
        });
        break;
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
}
