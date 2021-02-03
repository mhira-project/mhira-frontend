import { Permission } from '../../pages/administration/@types/permission';
import { Injectable } from '@angular/core';
import { User } from '@app/pages/administration/@types/user';

@Injectable({
  providedIn: 'root',
})
export class AppPermissionsService {
  constructor() {}

  permissionsOnly(action: any): boolean {
    const user = JSON.parse(localStorage.getItem('user')) as User;

    if (
      user && user.roles !== undefined && user.roles && user.roles.length > 0
        ? user.roles.find((role) => role.name === 'Super Admin') !== undefined
          ? true
          : false
        : false
    )
      return true;

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
}
