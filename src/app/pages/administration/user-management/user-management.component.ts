import { Component, OnInit } from '@angular/core';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { userForms } from '@app/pages/administration/user-management/form';
import { Router } from '@angular/router';
import { ModalType } from '@app/pages/administration/user-management/modal.type';
import { Form } from '@shared/components/field-generator/formt';
// @ts-ignore
const faker = require('faker');
// @ts-ignore
const moment = require('moment');

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss'],
})
export class UserManagementComponent implements OnInit {
  users: any[] = [];
  showModal: boolean = false;
  modalType: ModalType;
  changePasswordModal: ModalType = {
    title: 'Change Password',
    type: 'changePassword',
  };
  user = {
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    phone: '',
    id: '',
  };
  selectedUserIndex = -1;
  listOfData: any[] = [];
  listOfColumn: any[] = [
    {
      title: 'First name',
      name: 'firstName',
      isFilterable: true,
    },
    {
      title: 'Last name',
      name: 'lastName',

      isFilterable: true,
    },
    {
      title: 'Email',
      name: 'email',
      isFilterable: true,
    },
    {
      title: 'Phone',
      name: 'phone',
      isFilterable: false,
    },
    {
      title: 'Status',
      name: 'status',
      isFilterable: false,
    },
    {
      title: 'Created At',
      name: 'createdAt',
      isFilterable: false,
    },
  ];
  listOfCustomActions: any[] = [
    {
      type: 'edit',
      name: 'Edit User',
    },
    {
      type: 'changePassword',
      name: 'Change Password',
    },
    {
      type: 'delete',
      name: 'Delete User',
    },
  ];
  errors: any[] = [];
  changePasswordForm: Form = userForms.changeUserPassword;

  constructor(private modalService: NzModalService, private message: NzMessageService, private router: Router) {}

  ngOnInit(): void {
    for (var i = 0; i < 10; i++) {
      var id = faker.random.uuid();
      var lastName = faker.name.lastName();
      var firstName = faker.name.firstName();
      var phone = faker.phone.phoneNumber('255#########');
      var createdAt = faker.date.past();
      this.listOfData.push({
        id: id,
        firstName: firstName,
        lastName: lastName,
        email: `${firstName}.${lastName}@gmail.com`,
        createdAt: moment(createdAt).format('YYYY-MM-DD'),
        phone: phone,
        status: 'ACTIVE',
      });
    }
  }

  onCustomActionEvent(event: any) {
    this.user = this.listOfData[event.index];
    console.log(this.user);
    this.selectedUserIndex = event.index;
    switch (event.action.type) {
      case 'edit':
        this.showModal = true;
        this.router.navigate([`/mhira/administration/user-management/form`], {
          queryParams: { user: JSON.stringify(this.user) },
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
    this.showModal = true;
  }

  onFormSubmit($event: any) {}
}
