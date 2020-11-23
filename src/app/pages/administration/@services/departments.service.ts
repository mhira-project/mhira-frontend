import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';
import { Department } from '../@types/department';
import { Paging } from '../../../@shared/@types/paging';
import { Filter } from '../../../@shared/@types/filter';
import { Sorting } from '../../../@shared/@types/sorting';
import { FetchResult } from 'apollo-link';
import { DepartmentsQueries } from '../../../@graphql/queries/departments';
import { DepartmentsMutations } from '../../../@graphql/mutations/departments';

@Injectable({
  providedIn: 'root',
})
export class DepartmentsService {
  constructor(private apollo: Apollo) {}

  departments(params?: { paging?: Paging; filter?: Filter; sorting?: Sorting }): Observable<FetchResult<any>> {
    return this.apollo.query({
      query: DepartmentsQueries.departments,
      variables: {
        paging: params && params.paging ? params.paging : undefined,
        filter: params && params.filter ? params.filter : undefined,
        sorting: params && params.sorting ? params.sorting : undefined,
      },
      fetchPolicy: 'no-cache',
    });
  }

  createDepartment(role: Department): Observable<FetchResult<any>> {
    return this.apollo.mutate({
      mutation: DepartmentsMutations.createOneDepartment,
      variables: {
        input: { role },
      },
    });
  }

  updateDepartment(role: Department): Observable<FetchResult<any>> {
    return this.apollo.mutate({
      mutation: DepartmentsMutations.updateOneDepartment,
      variables: {
        input: { role },
      },
    });
  }

  deleteDepartment(role: Department): Observable<FetchResult<any>> {
    return this.apollo.mutate({
      mutation: DepartmentsMutations.deleteOneDepartment,
      variables: {
        input: { id: role.id },
      },
    });
  }
}
