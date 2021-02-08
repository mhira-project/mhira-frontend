import { Permission } from '../../pages/administration/@types/permission';
import { Injectable } from '@angular/core';
import { PermissionKey } from '../@types/permission';

@Injectable({
  providedIn: 'root',
})
export class AppPermissionsService {
  constructor() {}

  permissionsOnly(action: PermissionKey | PermissionKey[]): boolean {
    const permissions: Permission[] = JSON.parse(localStorage.getItem('permissions'));
    const keys = permissions.map((permission: Permission) => permission.name);
    if (!permissions || !keys) return false;

    if (typeof action === 'string') {
      return keys.includes(action);
    }
    if (typeof action === 'object') {
      return keys.some((key) => action.indexOf(key) >= 0);
    }

    return false;
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
