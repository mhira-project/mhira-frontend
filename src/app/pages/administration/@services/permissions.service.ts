import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';
import { FetchResult } from 'apollo-link';
import { Filter } from '@shared/@types/filter';
import { Sorting } from '@shared/@types/sorting';
import { Paging } from '@shared/@types/paging';
import { PermissionsQueries } from '../../../@graphql/queries/permissions';

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
}
