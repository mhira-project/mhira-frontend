import { Component, OnInit } from '@angular/core';
import { Permission } from '@app/pages/administration/@types/permission';
import { Role } from '@app/pages/administration/@types/role';
import { PermissionsService } from '@app/pages/administration/@services/permissions.service';
import { Sorting } from '@shared/@types/sorting';
import { Paging } from '@shared/@types/paging';
import { Filter } from '@shared/@types/filter';
import { RolesService } from '@app/pages/administration/@services/roles.service';
import { AppPermissionsService } from '@shared/services/app-permissions.service';
import { PermissionKey } from '@app/@shared/@types/permission';
import { ErrorHandlerService } from '../../../@shared/services/error-handler.service';
import { finalize } from 'rxjs/operators';
import { User } from '@app/pages/user-management/@types/user';

@Component({
  selector: 'app-roles-and-permissions',
  templateUrl: './roles-and-permissions.component.html',
  styleUrls: ['./roles-and-permissions.component.scss'],
})
export class RolesAndPermissionsComponent implements OnInit {
  PK = PermissionKey;
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
    private errorService: ErrorHandlerService,
    public perms: AppPermissionsService
  ) {}

  ngOnInit(): void {
    this.getPermissions({ paging: this.permissionsPaging });
    this.getRoles();
  }

  getPermissions(params?: { paging?: Paging; filter?: Filter; sorting?: Sorting }) {
    this.loading = true;
    const permissions: Permission[] = [];
    this.permissionService
      .permissions(params)
      .pipe(finalize(() => (this.loading = false)))
      .subscribe(
        ({ data }) => {
          data.permissions.edges.map((permission: any) => {
            permissions.push(permission.node);
          });
          this.matrix.permissions = permissions;
          this.permissionsPaging.after = data.permissions.pageInfo.endCursor;
          this.permissionsPaging.before = data.permissions.pageInfo.startCursor;
          this.permissionsPageInfo = data.permissions.pageInfo;
        },
        (error) => this.errorService.handleError(error, { prefix: 'Unable to load permissions' })
      );
  }

  getRoles(params?: { paging?: Paging; filter?: Filter; sorting?: Sorting }) {
    this.loading = true;
    const roles: Role[] = [];
    this.rolesService
      .roles(params)
      .pipe(finalize(() => (this.loading = false)))
      .subscribe(
        ({ data }: any) => {
          data.roles.edges.map((role: any) => {
            roles.push(role.node);
          });
          this.matrix.roles = roles;
          this.rolesPaging.after = data.roles.pageInfo.endCursor;
          this.rolesPaging.before = data.roles.pageInfo.startCursor;
          this.rolesPageInfo = data.roles.pageInfo;
        },
        (error) => this.errorService.handleError(error, { prefix: 'Unable to load roles' })
      );
  }

  permissionInRole(permission: Permission, role: Role): boolean {
    const permIds: number[] = role.permissions.map((perm) => perm.id);
    return permIds.includes(permission.id);
  }

  getUserPermissions(permission: any){
    const user = JSON.parse(localStorage.getItem('user')) as User;
    const userId = user.id;
    return this.matrix.roles.filter((el) => el.name === user.roles[0]?.name)[0]?.permissions.map((el) => el.name).includes(permission);
  }

  assignPermissionToRole(permission: Permission, role: Role, checked: boolean) {
    this.loading = true;
    if (checked) {
      this.rolesService
        .addPermissionsToRole(role.id, [permission.id])
        .pipe(finalize(() => (this.loading = false)))
        .subscribe(
          () => {},
          (error: any) =>
            this.errorService.handleError(error, {
              prefix: `Unable to assign permission "${permission.name}" to role "${role.name}"`,
            })
        );
    } else {
      this.rolesService
        .removePermissionsFromRole(role.id, [permission.id])
        .pipe(finalize(() => (this.loading = false)))
        .subscribe(
          () => {},
          (error: any) =>
            this.errorService.handleError(error, {
              prefix: `Unable to remove permission "${permission.name}" from role "${role.name}"`,
            })
        );
    }
  }
}
