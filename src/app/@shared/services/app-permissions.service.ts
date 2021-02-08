import { Permission } from '../../pages/administration/@types/permission';
import { Injectable } from '@angular/core';
import { PermissionKey, isPermissionKey, isPermissionKeyArray } from '../@types/permission';

@Injectable({
  providedIn: 'root',
})
export class AppPermissionsService {
  constructor() {}

  permissionsOnly(action: PermissionKey | PermissionKey[]): boolean {
    const permissions: Permission[] = JSON.parse(localStorage.getItem('permissions'));
    const keys = permissions?.map((permission) => permission?.name);
    if (!permissions || !keys) return false;

    if (isPermissionKey(action)) {
      return keys.includes(action);
    }
    if (isPermissionKeyArray(action)) {
      return keys.some((key) => action.indexOf(key) >= 0);
    }

    return false;
  }

  permissionsExcept(action: PermissionKey | PermissionKey[]): boolean {
    const permissions: Permission[] = JSON.parse(localStorage.getItem('permissions'));
    const keys = permissions?.map((permission) => permission?.name);
    if (!permissions || !keys) return false;

    if (isPermissionKey(action)) {
      return !keys.includes(action);
    }
    if (isPermissionKeyArray(action)) {
      return !keys.some((permissionName) => action.indexOf(permissionName) >= 0);
    }

    return false;
  }
}
