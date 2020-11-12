import { Component, OnInit } from '@angular/core';
import { Paging } from '@shared/@types/paging';
import { Role } from '@app/pages/administration/@types/role';
import { RolesTable } from '@app/pages/administration/@tables/roles.table';
import * as moment from 'moment';
import { Sorting } from '@shared/@types/sorting';
import { Filter } from '@shared/@types/filter';
import { environment } from '@env/environment';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { Router } from '@angular/router';
import { RolesService } from '@app/pages/administration/@services/roles.service';
import { RoleForm } from '@app/pages/administration/@forms/role.form';

const CryptoJS = require('crypto-js');

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss'],
})
export class RolesComponent implements OnInit {
  isLoading = false;
  modalLoading = false;
  roles: Role[] = [];
  paging: Paging = {
    first: 10,
  };
  pageInfo: any;
  rolesTable: { columns: any[]; rows: Role[] } = {
    columns: RolesTable.columns,
    rows: [],
  };
  actions = RolesTable.actions;

  showCreateRole = false;
  panelTitle = 'Create Role';
  loadingMessage = '';
  roleForms = RoleForm;
  hasErrors = false;
  errors: string[] = [];
  inputMode = true;
  showCancelButton = false;
  isCreateAction = false;

  constructor(
    private rolesService: RolesService,
    private modalService: NzModalService,
    private message: NzMessageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getRoles();
  }

  getRoles(params?: { paging?: Paging; filter?: Filter; sorting?: Sorting }) {
    this.isLoading = true;
    this.roles = [];
    const _roles: any[] = [];
    this.rolesService.roles(params).subscribe(
      async ({ data }: any) => {
        const roles = data.roles;
        roles.edges.map((role: any) => {
          const row = Object.assign({}, role.node);
          _roles.push({
            name: row.name,
            guard: row.guard,
            createdAt: row.createdAt ? moment(row.createdAt).format('DD-MM-YYYY HH:mm') : '',
          });
          this.roles.push(role.node);
        });

        this.rolesTable.rows = _roles;
        this.paging.after = data.roles.pageInfo.endCursor;
        this.paging.before = data.roles.pageInfo.startCursor;
        this.pageInfo = data.roles.pageInfo;
        this.isLoading = false;
      },
      (error: any) => {
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
    this.getRoles({ paging: this.paging });
  }

  deleteRole(role: Role) {
    this.modalLoading = true;
    this.rolesService.deleteRole(role).subscribe(
      async ({ data }: any) => {
        const deletedIndex = this.roles.findIndex((_role) => _role.id === role.id);
        this.roles.splice(deletedIndex, 1);
        this.rolesTable.rows.splice(deletedIndex, 1);
        this.modalLoading = false;
        this.message.create('success', `role has been successfully deleted`);
      },
      (error: any) => {
        this.modalLoading = false;
        this.message.create('error', `could not remove role for ${role.name}`);
      }
    );
  }

  handleActionClick(event: any): void {
    switch (event.action.name) {
      case 'Delete Role':
        this.modalService.confirm({
          nzTitle: 'Confirm',
          nzContent: `Are you sure you want to delete role for
               <b>${this.roles[event.index].name}</b>`,
          nzOkText: 'Delete',
          nzOnOk: () => this.deleteRole(this.roles[event.index]),
          nzOkDisabled: this.modalLoading,
          nzCancelText: 'Cancel',
        });
        break;
      case 'Edit Role':
        console.log('view results');
        break;
    }
  }

  handleRowClick(event: any) {
    const dataString = CryptoJS.AES.encrypt(JSON.stringify(this.roles[event.index]), environment.secretKey).toString();
    this.router.navigate(['/mhira/roles/plan-roles'], {
      state: {
        title: `${this.roles[event.index].name}`,
      },
      queryParams: {
        role: dataString,
      },
    });
  }

  toggleCreatePanel(create: boolean = true) {
    this.showCreateRole = !this.showCreateRole;
    this.isCreateAction = create;
    this.panelTitle = this.isCreateAction ? 'Create Role' : 'Update Role';
  }

  createRole(role: Role) {
    this.isLoading = true;
    this.hasErrors = false;
    this.errors = [];
    this.loadingMessage = `Creating role ${role.name}`;
    const _roles: any[] = this.rolesTable.rows;
    this.rolesService.createRole(role).subscribe(
      async ({ data }) => {
        const roleData = data.createOneRole;
        this.roles.push(roleData);
        _roles.push({
          name: roleData.name,
          guard: roleData.guard,
          createdAt: roleData.createdAt ? moment(roleData.createdAt).format('DD-MM-YYYY HH:mm') : '',
        });

        this.rolesTable.rows = _roles;
        this.isLoading = false;
        this.loadingMessage = '';
        this.message.create('success', `Role has successfully been created`);
      },
      (error) => {
        this.hasErrors = true;
        error.graphQLErrors.map((_error: any) => {
          this.errors.push(_error.message);
        });
        this.isLoading = false;
        this.loadingMessage = '';
      }
    );
  }

  submitForm(roleData: any) {
    if (this.isCreateAction) {
      this.createRole(roleData);
    } else {
      // roleData.id = this.role.id;
      // this.updateRole(roleData);
    }
  }
}
