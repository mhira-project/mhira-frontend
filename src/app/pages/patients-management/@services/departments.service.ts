import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';
import { FetchResult } from 'apollo-link';
import { Sorting } from '../../../@shared/@types/sorting';
import { Paging } from '../../../@shared/@types/paging';
import { NestJsQueriesService } from '../../../@shared/services/nestjs-queries.service';

const graphqlString = `
    id
    name
    description
    active
    createdAt
    updatedAt
`;

@Injectable({
  providedIn: 'root',
})
export class DepartmentsService {
  constructor(private apollo: Apollo, private nestJsQueriesService: NestJsQueriesService) {}

  departments(params?: { paging?: Paging; filter?: any; sorting?: Sorting[] }): Observable<FetchResult<any>> {
    if (params?.sorting?.length === 0) {
      params.sorting = [{ field: 'id', direction: 'DESC' }];
    }
    return this.apollo.query({
      query: this.nestJsQueriesService.getManyQuery('department', graphqlString),
      variables: {
        paging: params && params.paging ? params.paging : undefined,
        filter: params && params.filter ? params.filter : undefined,
        sorting: params && params.sorting ? params.sorting : undefined,
      },
      fetchPolicy: 'no-cache',
    });
  }

  addDepartmentsToPatient(patientId: number, departmentId: number): Observable<FetchResult<any>> {
    return this.apollo.mutate({
      mutation: this.nestJsQueriesService.relationalCommandMutation(
        'addDepartmentsToPatient',
        'AddDepartmentsToPatientInput',
        `id`
      ),
      variables: {
        input: {
          id: patientId,
          relationIds: [departmentId],
        },
      },
    });
  }

  removeDepartmentsFromPatient(patientId: number, departmentId: number): Observable<FetchResult<any>> {
    return this.apollo.mutate({
      mutation: this.nestJsQueriesService.relationalCommandMutation(
        'removeDepartmentsFromPatient',
        'RemoveDepartmentsFromPatientInput',
        `id`
      ),
      variables: {
        input: {
          id: patientId,
          relationIds: [departmentId],
        },
      },
    });
  }
}
