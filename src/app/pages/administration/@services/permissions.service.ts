import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';
import { FetchResult } from 'apollo-link';
import { Filter } from '@shared/@types/filter';
import { Sorting } from '@shared/@types/sorting';
import { Paging } from '@shared/@types/paging';
import { PermissionsQueries } from '../../../@graphql/queries/permissions';
import { PermissionsMutations } from '@app/@graphql/mutations/permissions';
import { RolesMutations } from '@app/@graphql/mutations/roles';

@Injectable({
  providedIn: 'root',
})
export class PermissionsService {
  constructor(private apollo: Apollo) {}

  permissions(params?: { paging?: Paging; filter?: Filter; sorting?: Sorting }): Observable<FetchResult<any>> {
    return this.apollo.query({
      query: PermissionsQueries.permissions,
      variables: {
        paging: params && params.paging ? params.paging : undefined,
        filter: params && params.filter ? params.filter : undefined,
        sorting: params && params.sorting ? params.sorting : undefined,
      },
      fetchPolicy: 'no-cache',
    });
  }

  setRolesOnPermission(permissionId: number, roleId: number): Observable<FetchResult<any>> {
    return this.apollo.query({
      query: PermissionsMutations.setRolesOnPermission,
      variables: {
        id: permissionId,
        relationId: roleId,
      },
      fetchPolicy: 'no-cache',
    });
  }

  setPermissionsOnRole(roleId: number, permissionId: number): Observable<FetchResult<any>> {
    return this.apollo.query({
      query: RolesMutations.setPermissionsOnRole,
      variables: {
        id: roleId,
        relationId: permissionId,
      },
      fetchPolicy: 'no-cache',
    });
  }

  removePermissionsFromRole(roleId: number, permissionId: number): Observable<FetchResult<any>> {
    return this.apollo.query({
      query: RolesMutations.removePermissionsFromRole,
      variables: {
        id: roleId,
        relationId: permissionId,
      },
      fetchPolicy: 'no-cache',
    });
  }
}
