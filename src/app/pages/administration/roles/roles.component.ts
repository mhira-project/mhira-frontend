import { Component, OnInit } from '@angular/core';
import { Paging } from '@shared/@types/paging';
import { Role, UpdateOneRoleInput } from '@app/pages/administration/@types/role';
import { RolesTable } from '@app/pages/administration/@tables/roles.table';
import { Sorting } from '@shared/@types/sorting';
import { Filter } from '@shared/@types/filter';
import { RolesService } from '@app/pages/administration/@services/roles.service';
import { RoleForm } from '@app/pages/administration/@forms/role.form';
import { Convert } from '@shared/classes/convert';
import { AppPermissionsService } from '@shared/services/app-permissions.service';
import { PermissionKey } from '@app/@shared/@types/permission';
import { PaginationService } from '@shared/services/pagination.service';
import { ErrorHandlerService } from '../../../@shared/services/error-handler.service';
import { finalize } from 'rxjs/operators';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzMessageService } from 'ng-zorro-antd/message';

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
  inputMode = true;
  showCancelButton = false;
  isCreateAction = false;
  role: Role;

  constructor(
    private rolesService: RolesService,
    private modalService: NzModalService,
    private message: NzMessageService,
    private errorService: ErrorHandlerService,
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
    this.rolesService
      .roles(params)
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe(
        ({ data }: any) => {
          data.roles.edges.map((role: any) => {
            this.roles.push(Convert.toRole(role.node));
          });
          this.rolesTable.rows = this.roles;
          this.paging.after = data.roles.pageInfo.endCursor;
          this.paging.before = data.roles.pageInfo.startCursor;
          this.pageInfo = data.roles.pageInfo;
        },
        (error) => this.errorService.handleError(error, { prefix: 'Unable to get roles' })
      );
  }

  navigatePages(direction: 'next' | 'previous', pageSize: number = 10) {
    const paging = this.paginationService.navigatePages(this.paging, direction, pageSize);
    this.getRoles({ paging });
  }

  deleteRole(role: Role, index: number) {
    this.modalLoading = true;
    this.rolesService
      .deleteRole(role)
      .pipe(finalize(() => (this.modalLoading = false)))
      .subscribe(
        () => {
          this.rolesTable.rows.splice(index, 1);
          this.message.success('Role has been successfully deleted');
        },
        (error) => this.errorService.handleError(error, { prefix: `Could not remove role for ${role.name}` })
      );
  }

  handleActionClick(event: any): void {
    this.role = this.roles[event.index];
    this.populateForm = false;
    switch (event.action.name) {
      case 'Delete Role':
        this.modalService.confirm({
          nzTitle: 'Confirm',
          nzContent: `Are you sure you want to delete the role
               <b>${this.roles[event.index].name}</b>. ${
            this.role.users && this.role.users.length > 0
              ? 'There are users assigned to this role.  If you delete it, these users will have no role and lose all permissions'
              : 'This role have no users assigned to it.'
          }`,
          nzOkText: 'Delete',
          nzOnOk: () => this.deleteRole(this.roles[event.index], event.index),
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
    if (!this.perms.permissionsOnly([PermissionKey.MANAGE_ROLES_PERMISSIONS])) return;

    this.role = this.roles[event.index];
    this.populateForm = true;
    this.toggleCreatePanel(false);
  }

  disableEnableFields() {
    this.roleForms.groups.forEach((group) =>
      group.fields.forEach((field) => {
        field.name === 'hierarchy' && this.perms.isSuperAdmin ? (field.disabled = true) : (field.disabled = false);
      })
    );
  }

  closeCreatePanel() {
    this.populateForm = false;
    this.resetForm = false;
    this.showCreateRole = false;
  }

  toggleCreatePanel(create: boolean = true) {
    this.disableEnableFields();
    this.showCreateRole = !this.showCreateRole;
    this.isCreateAction = create;
    if (create) {
      this.role = null;
      this.resetForm = true;
    }
    this.panelTitle = !this.isCreateAction ? 'Update Role' : 'Create Role' ;
  }

  createRole(role: Role) {
    this.isLoading = true;
    this.populateForm = false;
    this.resetForm = false;
    this.loadingMessage = `Creating role ${role.name}`;
    this.rolesService
      .createRole(role)
      .pipe(
        finalize(() => {
          this.isLoading = false;
          this.loadingMessage = '';
        })
      )
      .subscribe(
        ({ data }) => {
          this.roles.push(Convert.toRole(data.createOneRole));
          this.rolesTable.rows = this.roles;
          this.resetForm = true;
          this.populateForm = false;
          this.toggleCreatePanel();
          this.getRoles();
          this.message.success('Role has successfully been created');
        },
        (error) => this.errorService.handleError(error, { prefix: 'Unable to create role' })
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
        hierarchy: role.hierarchy,
      },
    };
    this.isLoading = true;
    this.loadingMessage = `Updating role ${role.name}`;
    this.rolesService
      .updateRole(updateOneRoleInput)
      .pipe(
        finalize(() => {
          this.isLoading = false;
          this.loadingMessage = '';
        })
      )
      .subscribe(
        ({ data }) => {
          const updatedRole: Role = Convert.toRole(data.updateOneRole);
          this.roles = this.roles.map((dep: Role) => {
            if (dep.id === updatedRole.id) {
              dep = updatedRole;
            }
            return dep;
          });
          this.rolesTable.rows = this.roles;
          this.resetForm = true;
          this.populateForm = false;
          this.toggleCreatePanel();
          this.message.success('Role has successfully been updated');
          this.role = null;
        },
        (error) => this.errorService.handleError(error, { prefix: `Unable to delete role "${role.name}"` })
      );
  }
}
