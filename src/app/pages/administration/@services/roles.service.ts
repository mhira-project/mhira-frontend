import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';
import { FetchResult } from 'apollo-link';
import { Filter } from '@shared/@types/filter';
import { Sorting } from '@shared/@types/sorting';
import { Paging } from '@shared/@types/paging';
import { RolesQueries } from '../../../@graphql/queries/roles';
import { Role } from '@app/pages/administration/@types/role';
import { RolesMutations } from '@app/@graphql/mutations/roles';
import { Assessment } from '@app/pages/assessment/@types/assessment';
import { AssessmentsMutations } from '@app/@graphql/mutations/assessments';

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
      variables: role,
      fetchPolicy: 'no-cache',
    });
  }

  updateRole(role: Role): Observable<FetchResult<any>> {
    return this.apollo.mutate({
      mutation: RolesMutations.updateOneRole,
      variables: role,
      fetchPolicy: 'no-cache',
    });
  }

  deleteRole(role: Role): Observable<FetchResult<any>> {
    return this.apollo.mutate({
      mutation: RolesMutations.deleteOneRole,
      variables: { id: role.id },
      fetchPolicy: 'no-cache',
    });
  }
}
