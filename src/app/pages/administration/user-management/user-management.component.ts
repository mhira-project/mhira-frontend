import { Component, OnInit } from '@angular/core';
// @ts-ignore
const faker = require('faker');

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss'],
})
export class UserManagementComponent implements OnInit {
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
  constructor() {}

  ngOnInit(): void {
    for(var i=0; i<10; i++){
      var firstName = faker.name.firstName();
      var lastName = faker.name.lastName();
      var firstName = faker.name.firstName();
      var phone = faker.phone.phoneNumber('+255#########');
      var createdAt = faker.date.past();
      this.listOfData.push({
        firstName:firstName,
        lastName:lastName,
        email:`${firstName}.${lastName}@gmail.com`,
        createdAt:createdAt,
        phone:phone,
        status: 'ACTIVE'
      })
    }
  }
}
