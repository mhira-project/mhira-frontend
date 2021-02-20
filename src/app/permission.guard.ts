import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { AppPermissionsService } from '@shared/services/app-permissions.service';
import { PermissionKey } from '@app/@shared/@types/permission';

@Injectable({
  providedIn: 'root',
})
export class PermissionGuard implements CanActivate {
  constructor(private permissionService: AppPermissionsService) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const only: PermissionKey | PermissionKey[] = route.data?.permissions?.only ?? [];
    const except: PermissionKey | PermissionKey[] = route.data?.permissions?.except ?? [];
    const hasAccess = this.permissionService.permissionsOnly(only) && this.permissionService.permissionsExcept(except);
    return hasAccess;
  }
}
