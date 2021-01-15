import { Component, OnInit } from '@angular/core';
import { Permission } from '@app/pages/administration/@types/permission';
import { Role } from '@app/pages/administration/@types/role';
import { PermissionsService } from '@app/pages/administration/@services/permissions.service';
import { Sorting } from '@shared/@types/sorting';
import { Paging } from '@shared/@types/paging';
import { Filter } from '@shared/@types/filter';
import { RolesService } from '@app/pages/administration/@services/roles.service';
import { RolePermission } from '@app/pages/administration/@types/role_permissions';
import { AppPermissionsService } from '@shared/services/app-permissions.service';

@Component({
  selector: 'app-roles-and-permissions',
  templateUrl: './roles-and-permissions.component.html',
  styleUrls: ['./roles-and-permissions.component.scss'],
})
export class RolesAndPermissionsComponent implements OnInit {
  loading = false;
  rolesPaging: Paging = {
    first: 50,
  };
  rolesPageInfo: any;
  permissionsPaging: Paging = {
    first: 50,
  };
  permissionsPageInfo: any;
  matrix: { roles: Role[]; permissions: Permission[] } = {
    roles: [],
    permissions: [],
  };

  constructor(
    private rolesService: RolesService,
    private permissionService: PermissionsService,
    public perms: AppPermissionsService
  ) {}

  ngOnInit(): void {
    this.getPermissions({ paging: this.permissionsPaging });
    this.getRoles();
  }

  getPermissions(params?: { paging?: Paging; filter?: Filter; sorting?: Sorting }) {
    this.loading = true;
    const permissions: Permission[] = [];
    this.permissionService.permissions(params).subscribe(
      async ({ data }) => {
        data.permissions.edges.map((permission: any) => {
          permissions.push(permission.node);
        });
        this.matrix.permissions = permissions;
        this.permissionsPaging.after = data.permissions.pageInfo.endCursor;
        this.permissionsPaging.before = data.permissions.pageInfo.startCursor;
        this.permissionsPageInfo = data.permissions.pageInfo;
        this.loading = false;
      },
      (error) => {
        this.loading = false;
      }
    );
  }

  getRoles(params?: { paging?: Paging; filter?: Filter; sorting?: Sorting }) {
    this.loading = true;
    const roles: Role[] = [];
    this.rolesService.roles(params).subscribe(
      async ({ data }: any) => {
        data.roles.edges.map((role: any) => {
          roles.push(role.node);
        });
        this.matrix.roles = roles;
        this.rolesPaging.after = data.roles.pageInfo.endCursor;
        this.rolesPaging.before = data.roles.pageInfo.startCursor;
        this.rolesPageInfo = data.roles.pageInfo;
        this.loading = false;
      },
      (error: any) => {
        this.loading = false;
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

  assignPermissionToRole(permission: Permission, role: Role, checked: boolean) {
    this.loading = true;
    if (checked) {
      this.rolesService.addPermissionsToRole(role.id, [permission.id]).subscribe(
        async ({ data }: any) => {
          this.loading = false;
        },
        (error: any) => {
          console.log(error);
          this.loading = false;
        }
      );
    } else {
      this.rolesService.removePermissionsFromRole(role.id, [permission.id]).subscribe(
        async ({ data }: any) => {
          this.loading = false;
        },
        (error: any) => {
          this.loading = false;
        }
      );
    }
  }
}
