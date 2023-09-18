import { Permission } from '../../pages/administration/@types/permission';
import { Injectable } from '@angular/core';
import { PermissionKey, isPermissionKey, isPermissionKeyArray } from '../@types/permission';
import { User } from '@app/pages/user-management/@types/user';
import { Role } from '@app/pages/administration/@types/role';

@Injectable({
  providedIn: 'root',
})
export class AppPermissionsService {
  constructor() {}

  hasAccessLevelToRole(role: Role): boolean {
    const user = JSON.parse(localStorage.getItem('user')) as User;
    return !!user?.roles?.some?.((r) => r.hierarchy < role.hierarchy);
  }

  hasAccessLevelToUser(accessingUser: User): boolean {
    const user = JSON.parse(localStorage.getItem('user')) as User;
    return !!user?.roles?.some?.((r) => accessingUser?.roles?.every?.((ar) => r.hierarchy < ar.hierarchy));
  }

  permissionsOnly(action: PermissionKey | PermissionKey[]): boolean {
    if (this.isSuperAdmin()) return true;

    const permissions: Permission[] = JSON.parse(sessionStorage.getItem('permissions'));
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
    const permissions: Permission[] = JSON.parse(sessionStorage.getItem('permissions'));
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

  isSuperAdmin(): boolean {
    const user = JSON.parse(localStorage.getItem('user')) as User;
    return !!user?.roles?.find?.((role) => role.isSuperAdmin);
  }

  getUserHierarchy(): number {
    const user = JSON.parse(localStorage.getItem('user')) as User;
    return user.roles[0].hierarchy;
  }
}
