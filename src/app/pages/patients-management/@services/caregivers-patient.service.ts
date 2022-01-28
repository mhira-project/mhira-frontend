import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { NestJsQueriesService } from '../../../@shared/services/nestjs-queries.service';
import { Paging } from '../../../@shared/@types/paging';
import { Sorting } from '../../../@shared/@types/sorting';
import { Observable } from 'rxjs';
import { FetchResult } from 'apollo-link';

const graphqlString = `
      id
          emergencyContact
          firstName
          middleName
          lastName
          email
          phone
          deletedAt
          createdAt
          updatedAt
`;
@Injectable({
  providedIn: 'root',
})
export class CaregiversPatientService {
  constructor(private apollo: Apollo, private nestJsQueriesService: NestJsQueriesService) {}

  caregiversPatient(params?: { paging?: Paging; filter?: any; sorting?: Sorting[] }): Observable<FetchResult<any>> {
    if (params?.sorting?.length === 0) {
      params.sorting = [{ field: 'id', direction: 'DESC' }];
    }
    return this.apollo.query({
      query: this.nestJsQueriesService.getManyQuery('caregiversPatient', graphqlString),
      variables: {
        paging: params && params.paging ? params.paging : undefined,
        filter: params && params.filter ? params.filter : undefined,
        sorting: params && params.sorting ? params.sorting : undefined,
      },
      fetchPolicy: 'no-cache',
    });
  }

  addCaregiversToPatient(patientId: number, caregiverId: number): Observable<FetchResult<any>> {
    return this.apollo.mutate({
      mutation: this.nestJsQueriesService.relationalCommandMutation(
        'addCaregiversToPatient',
        'addCaregiversToPatientInput',
        `id`
      ),
      variables: {
        input: {
          id: patientId,
          relationIds: [caregiverId],
        },
      },
    });
  }

  removeCaregiversFromPatient(patientId: number, caregiverId: number): Observable<FetchResult<any>> {
    return this.apollo.mutate({
      mutation: this.nestJsQueriesService.relationalCommandMutation(
        'removeCaregiversFromPatient',
        'removeCaregiversFromPatientInput',
        `id`
      ),
      variables: {
        input: {
          id: patientId,
          relationIds: [caregiverId],
        },
      },
    });
  }
}
