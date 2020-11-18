import { Permission } from '../../pages/administration/@types/permission';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AppPermissionsService {
  constructor() {}

  permissionsOnly(action: any): boolean {
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
