import { Component, OnInit } from '@angular/core';
import { Permission } from '@app/pages/administration/@types/permission';
import { Role } from '@app/pages/administration/@types/role';
import { PermissionsService } from '@app/pages/administration/@services/permissions.service';
import { Sorting } from '@shared/@types/sorting';
import { Paging } from '@shared/@types/paging';
import { Filter } from '@shared/@types/filter';
import { RolesService } from '@app/pages/administration/@services/roles.service';
import { RolePermission } from '@app/pages/administration/@types/role_permissions';

@Component({
  selector: 'app-roles-and-permissions',
  templateUrl: './roles-and-permissions.component.html',
  styleUrls: ['./roles-and-permissions.component.scss'],
})
export class RolesAndPermissionsComponent implements OnInit {
  rolesLoading = false;
  rolesPageInfo: any;
  permissionsLoading = false;
  permissionsPageInfo: any;
  permissions: Permission[] = [];
  roles: Role[] = [];
  rolesPaging: Paging = {
    first: 10,
  };
  permissionsPaging: Paging = {
    first: 10,
  };
  matrix: RolePermission[];
  checked = false;

  constructor(private rolesService: RolesService, private permissionService: PermissionsService) {}

  ngOnInit(): void {
    this.getPermissions();
    this.getRoles();
  }

  getPermissions(params?: { paging?: Paging; filter?: Filter; sorting?: Sorting }) {
    this.permissionsLoading = true;
    this.permissions = [];
    this.permissionService.permissions(params).subscribe(
      async ({ data }) => {
        const permissions = data.permissions;
        permissions.edges.map((permission: any) => {
          this.permissions.push(permission.node);
        });

        this.permissionsPaging.after = data.permissions.pageInfo.endCursor;
        this.permissionsPaging.before = data.permissions.pageInfo.startCursor;
        this.permissionsPageInfo = data.permissions.pageInfo;
        this.permissionsLoading = false;
      },
      (error) => {
        this.permissionsLoading = false;
      }
    );
  }

  getRoles(params?: { paging?: Paging; filter?: Filter; sorting?: Sorting }) {
    this.rolesLoading = true;
    this.roles = [];
    this.rolesService.roles(params).subscribe(
      async ({ data }: any) => {
        const roles = data.roles;
        roles.edges.map((role: any) => {
          this.roles.push(role.node);
        });
        this.rolesPaging.after = data.roles.pageInfo.endCursor;
        this.rolesPaging.before = data.roles.pageInfo.startCursor;
        this.rolesPageInfo = data.roles.pageInfo;
        this.rolesLoading = false;
      },
      (error: any) => {
        this.rolesLoading = false;
      }
    );
  }

  permissionInRole(permission: Permission, role: Role): boolean {
    for (const _permission of role.permissions) {
      if (_permission.id === permission.id) {
        return true;
      }
    }
    return false;
  }

  log(permission: Permission, role: Role, checked: boolean) {
    console.log(permission.id, role.id, checked);
  }

  assignPermissionToRole(permission: Permission, role: Role, checked: boolean) {
    if (checked) {
      this.permissionService.setPermissionsOnRole(role.id, permission.id).subscribe(
        async ({ data }: any) => {
          console.log(data);
        },
        (error: any) => {
          console.log(error);
        }
      );
    } else {
      this.permissionService.removePermissionsFromRole(role.id, permission.id).subscribe(
        async ({ data }: any) => {
          console.log(data);
        },
        (error: any) => {
          console.log(error);
        }
      );
    }
  }
}
