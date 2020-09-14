import { Component, OnInit } from '@angular/core';

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

  ngOnInit(): void {}
}
