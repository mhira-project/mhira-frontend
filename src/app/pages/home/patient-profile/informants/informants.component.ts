import { Component, OnInit } from '@angular/core';
import { table } from './informants.table';
import { Router } from '@angular/router';
import { PatientsService } from '@app/pages/home/@services/patients.service';
import * as moment from 'moment';

@Component({
  selector: 'app-informants',
  templateUrl: './informants.component.html',
  styleUrls: ['./informants.component.scss'],
})
export class InformantsComponent implements OnInit {
  isLoading = false;
  isVisible = false;
  isOkLoading = false;
  users: any[] = [];
  informantsTable: { columns: any[]; rows: any[] } = {
    columns: table.columns,
    rows: [],
  };
  actions = table.actions;
  managers: any[] = [
    {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@mhirahealth.org',
    },
    {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@mhirahealth.org',
    },
    {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@mhirahealth.org',
    },
    {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@mhirahealth.org',
    },
  ];

  constructor(private patientsService: PatientsService, private router: Router) {}

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    this.isLoading = true;
    this.users = [];
    const _users: any[] = [];
    this.patientsService.getUsers().subscribe(
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
          _users.push(row);
          this.users.push(user.node);
        });

        this.informantsTable.rows = _users;
        this.isLoading = false;
      },
      (error) => {
        this.isLoading = false;
      }
    );
  }

  handleAssignUser(): void {
    this.isVisible = true;
  }

  handleCancel(): void {
    this.isVisible = false;
  }

  assignUser() {}

  handleActionClick(event: any) {}
}
