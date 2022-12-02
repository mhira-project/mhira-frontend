import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';
import { FetchResult } from 'apollo-link';
import { Filter } from '@shared/@types/filter';
import { Sorting } from '@shared/@types/sorting';
import { Paging } from '@shared/@types/paging';
import { RolesQueries } from '../../../@graphql/queries/roles';
import { Role, UpdateOneRoleInput } from '@app/pages/administration/@types/role';
import { RolesMutations } from '@app/@graphql/mutations/roles';

@Injectable({
  providedIn: 'root',
})
export class RolesService {
  constructor(private apollo: Apollo) {}

  roles(params?: { paging?: Paging; filter?: Filter; sorting?: Sorting }): Observable<FetchResult<any>> {
    return this.apollo.query({
      query: RolesQueries.roles,
      variables: {
        paging: params && params.paging ? params.paging : undefined,
        filter: params && params.filter ? params.filter : undefined,
        sorting: params && params.sorting ? params.sorting : undefined,
      },
      fetchPolicy: 'no-cache',
    });
  }

  createRole(role: Role): Observable<FetchResult<any>> {
    return this.apollo.mutate({
      mutation: RolesMutations.createOneRole,
      variables: {
        input: { role },
      },
      fetchPolicy: 'no-cache',
    });
  }

  updateRole(updateOneRoleInput: UpdateOneRoleInput): Observable<FetchResult<any>> {
    return this.apollo.mutate({
      mutation: RolesMutations.updateOneRole,
      variables: {
        input: updateOneRoleInput,
      },
      fetchPolicy: 'no-cache',
    });
  }

  addPermissionsToRole(roleId: number, permissionIds: number[]): Observable<FetchResult<any>> {
    return this.apollo.mutate({
      mutation: RolesMutations.addPermissionsToRole,
      variables: {
        input: {
          id: roleId,
          relationIds: permissionIds,
        },
      },
      fetchPolicy: 'no-cache',
    });
  }

  addUsersToRole(roleId: number, usersIds: number[]): Observable<FetchResult<any>> {
    return this.apollo.mutate({
      mutation: RolesMutations.addUsersToRole,
      variables: {
        input: {
          id: roleId,
          relationIds: usersIds,
        },
      },
      fetchPolicy: 'no-cache',
    });
  }

  addRolesToUser(userId: number, rolesIds: number[]): Observable<FetchResult<any>> {
    return this.apollo.mutate({
      mutation: RolesMutations.addRolesToUser,
      variables: {
        input: {
          id: userId,
          relationIds: rolesIds,
        },
      },
      fetchPolicy: 'no-cache',
    });
  }

  removeRolesFromUser(userId: number, rolesIds: number[]): Observable<FetchResult<any>> {
    return this.apollo.mutate({
      mutation: RolesMutations.removeRolesFromUser,
      variables: {
        input: {
          id: userId,
          relationIds: rolesIds,
        },
      },
      fetchPolicy: 'no-cache',
    });
  }

  addRolesToReport(reportId: number, rolesIds: number[]): Observable<FetchResult<any>> {
    return this.apollo.mutate({
      mutation: RolesMutations.addRolesToReport,
      variables: {
        input: {
          id: reportId,
          relationIds: rolesIds,
        },
      },
      fetchPolicy: 'no-cache',
    });
  }

  removeRolesFromReport(reportId: number, rolesIds: number[]): Observable<FetchResult<any>> {
    return this.apollo.mutate({
      mutation: RolesMutations.removeRolesFromReport,
      variables: {
        input: {
          id: reportId,
          relationIds: rolesIds,
        },
      },
      fetchPolicy: 'no-cache',
    });
  }

  removePermissionsFromRole(roleId: number, permissionsId: number[]): Observable<FetchResult<any>> {
    return this.apollo.mutate({
      mutation: RolesMutations.removePermissionsFromRole,
      variables: {
        input: {
          id: roleId,
          relationIds: permissionsId,
        },
      },
      fetchPolicy: 'no-cache',
    });
  }

  deleteRole(role: Role): Observable<FetchResult<any>> {
    return this.apollo.mutate({
      mutation: RolesMutations.deleteOneRole,
      variables: {
        input: { id: role.id },
      },
      fetchPolicy: 'no-cache',
    });
  }
}
