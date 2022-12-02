import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';
import { Department, UpdateOneDepartmentInput } from '../@types/department';
import { Paging } from '@shared/@types/paging';
import { Filter } from '@shared/@types/filter';
import { Sorting } from '@shared/@types/sorting';
import { FetchResult } from 'apollo-link';
import { DepartmentsQueries } from '@app/@graphql/queries/departments';
import { DepartmentsMutations } from '@app/@graphql/mutations/departments';
import { RolesMutations } from '@app/@graphql/mutations/roles';

@Injectable({
  providedIn: 'root',
})
export class DepartmentsService {
  constructor(private apollo: Apollo) {}

  departments(params?: { paging?: Paging; filter?: Filter; sorting?: Sorting[] }): Observable<FetchResult<any>> {
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

  createDepartment(department: Department): Observable<FetchResult<any>> {
    return this.apollo.mutate({
      mutation: DepartmentsMutations.createOneDepartment,
      variables: {
        input: { department },
      },
    });
  }

  updateDepartment(department: UpdateOneDepartmentInput): Observable<FetchResult<any>> {
    return this.apollo.mutate({
      mutation: DepartmentsMutations.updateOneDepartment,
      variables: {
        input: { id: department.id, update: department.update },
      },
    });
  }

  deleteDepartment(department: Department): Observable<FetchResult<any>> {
    return this.apollo.mutate({
      mutation: DepartmentsMutations.deleteOneDepartment,
      variables: {
        input: { id: department.id },
      },
    });
  }

  addDepartmentsToUser(userId: number, rolesIds: number[]): Observable<FetchResult<any>> {
    return this.apollo.mutate({
      mutation: RolesMutations.addDepartmentsToUser,
      variables: {
        input: {
          id: userId,
          relationIds: rolesIds,
        },
      },
      fetchPolicy: 'no-cache',
    });
  }

  removeDepartmentsFromUser(userId: number, rolesIds: number[]): Observable<FetchResult<any>> {
    return this.apollo.mutate({
      mutation: RolesMutations.removeDepartmentsFromUser,
      variables: {
        input: {
          id: userId,
          relationIds: rolesIds,
        },
      },
      fetchPolicy: 'no-cache',
    });
  }
}
