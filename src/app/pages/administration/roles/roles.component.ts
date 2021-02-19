import { Component, OnInit } from '@angular/core';
import { Paging } from '@shared/@types/paging';
import { Role, UpdateOneRoleInput } from '@app/pages/administration/@types/role';
import { RolesTable } from '@app/pages/administration/@tables/roles.table';
import { Sorting } from '@shared/@types/sorting';
import { Filter } from '@shared/@types/filter';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { RolesService } from '@app/pages/administration/@services/roles.service';
import { RoleForm } from '@app/pages/administration/@forms/role.form';
import { Convert } from '@shared/classes/convert';
import { AppPermissionsService } from '@shared/services/app-permissions.service';
import { PermissionKey } from '@app/@shared/@types/permission';
import { PaginationService } from '@shared/services/pagination.service';

const CryptoJS = require('crypto-js');

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss'],
})
export class RolesComponent implements OnInit {
  PK = PermissionKey;
  isLoading = false;
  modalLoading = false;
  populateForm = false;
  resetForm = false;
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
  role: Role;

  constructor(
    private rolesService: RolesService,
    private modalService: NzModalService,
    private message: NzMessageService,
    public perms: AppPermissionsService,
    private paginationService: PaginationService
  ) {}

  ngOnInit(): void {
    this.getRoles();
  }

  getRoles(params?: { paging?: Paging; filter?: Filter; sorting?: Sorting }) {
    this.isLoading = true;
    this.roles = [];
    this.rolesTable.rows = [];
    this.rolesService.roles(params).subscribe(
      async ({ data }: any) => {
        data.roles.edges.map((role: any) => {
          this.roles.push(Convert.toRole(role.node));
        });
        this.rolesTable.rows = this.roles;
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

  navigatePages(direction: 'next' | 'previous', pageSize: number = 10) {
    const paging = this.paginationService.navigatePages(this.paging, direction, pageSize);
    this.getRoles({ paging });
  }

  deleteRole(role: Role) {
    this.modalLoading = true;
    this.rolesService.deleteRole(role).subscribe(
      async ({ data }: any) => {
        const deletedIndex = this.roles.findIndex((_role) => _role.id === role.id);
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
    this.role = this.roles[event.index];
    this.populateForm = false;
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
        this.populateForm = true;
        this.toggleCreatePanel(false);
        break;
    }
  }

  handleRowClick(event: any) {
    this.role = this.roles[event.index];
    this.populateForm = true;
    this.toggleCreatePanel(false);
  }

  closeCreatePanel() {
    this.populateForm = false;
    this.resetForm = false;
    this.showCreateRole = false;
  }

  toggleCreatePanel(create: boolean = true) {
    this.showCreateRole = !this.showCreateRole;
    this.isCreateAction = create;
    if (create) {
      this.role = null;
      this.resetForm = true;
    }
    this.panelTitle = !this.isCreateAction ? 'Update Role' : 'Create Role';
  }

  createRole(role: Role) {
    this.isLoading = true;
    this.hasErrors = false;
    this.populateForm = false;
    this.resetForm = false;
    this.errors = [];
    this.loadingMessage = `Creating role ${role.name}`;
    this.rolesService.createRole(role).subscribe(
      async ({ data }) => {
        this.roles.push(Convert.toRole(data.createOneRole));
        this.rolesTable.rows = this.roles;
        this.isLoading = false;
        this.resetForm = true;
        this.populateForm = false;
        this.loadingMessage = '';
        this.toggleCreatePanel();
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
      roleData.id = this.role.id;
      this.updateRole(roleData);
    }
  }

  private updateRole(role: Role) {
    const updateOneRoleInput: UpdateOneRoleInput = {
      id: role.id,
      update: {
        name: role.name,
        guard: role.guard,
      },
    };
    this.isLoading = true;
    this.hasErrors = false;
    this.errors = [];
    this.loadingMessage = `Updating role ${role.name}`;
    this.rolesService.updateRole(updateOneRoleInput).subscribe(
      async ({ data }) => {
        const updatedRole: Role = Convert.toRole(data.updateOneRole);
        this.roles = this.roles.map((dep: Role) => {
          if (dep.id === updatedRole.id) {
            dep = updatedRole;
          }
          return dep;
        });
        this.rolesTable.rows = this.roles;
        this.isLoading = false;
        this.resetForm = true;
        this.populateForm = false;
        this.loadingMessage = '';
        this.toggleCreatePanel();
        this.message.create('success', `Role has successfully been updated`);
        this.role = null;
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
}
