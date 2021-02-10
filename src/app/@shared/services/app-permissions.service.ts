import { Permission } from '../../pages/administration/@types/permission';
import { Injectable } from '@angular/core';
import { User } from '@app/pages/user-management/@types/user';

@Injectable({
  providedIn: 'root',
})
export class AppPermissionsService {
  constructor() {}

  permissionsOnly(action: any): boolean {
    if (this.isSuperAdmin()) return true;

    let permissions = JSON.parse(localStorage.getItem('permissions'));
    if (permissions) {
      permissions = permissions.map((permission: Permission) => {
        return permission.name;
      });
      if (typeof action === 'string') {
        return permissions.includes(action);
      }
      if (typeof action === 'object') {
        return permissions.some((permissionName: string) => action.indexOf(permissionName) >= 0);
      }
      return false;
    }
  }

  permissionsExcept(action: any): boolean {
    let permissions = JSON.parse(localStorage.getItem('permissions'));
    if (permissions) {
      permissions = permissions.map((permission: Permission) => {
        return permission.name;
      });
      if (typeof action === 'string') {
        return !permissions.includes(action);
      }
      if (typeof action === 'object') {
        return permissions.some((permissionName: string) => action.indexOf(permissionName) === -1);
      }
      return false;
    }
  }

  private isSuperAdmin(): boolean {
    const user = JSON.parse(localStorage.getItem('user')) as User;
    return !!user?.roles?.find?.((role) => role.isSuperAdmin);
  }
}
