import { Component, OnInit } from '@angular/core';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
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
  userModal: boolean = false;
  user = {
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    phone: '',
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

  constructor(private modalService: NzModalService, private message: NzMessageService) {}

  ngOnInit(): void {
    for (var i = 0; i < 10; i++) {
      var firstName = faker.name.firstName();
      var lastName = faker.name.lastName();
      var firstName = faker.name.firstName();
      var phone = faker.phone.phoneNumber('255#########');
      var createdAt = faker.date.past();
      this.listOfData.push({
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
    this.user = this.users[event.index];
    this.selectedUserIndex = event.index;
    switch (event.action.type) {
      case 'edit':
        this.userModal = true;
        break;
      case 'changePassword':
        break;
      case 'delete':
        this.modalService.confirm({
          nzTitle: 'Confirm',
          nzContent: `Are you sure you want to delete ${this.user.firstName}`,
          nzOkText: 'Delete',
          nzOnOk: () => {},
          nzCancelText: 'Cancel',
        });
        break;
    }
  }

  handleCancel() {
    this.userModal = false;
  }

  handleOk() {
    this.userModal = false;
  }

  onCreateUser() {
    this.userModal = true;
  }
}
