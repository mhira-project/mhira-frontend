import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { NestJsQueriesService } from '../../../@shared/services/nestjs-queries.service';
import { Paging } from '../../../@shared/@types/paging';
import { Sorting } from '../../../@shared/@types/sorting';
import { Observable } from 'rxjs';
import { FetchResult } from 'apollo-link';
import { UpdateOnePatientCaregiverInput } from '@app/pages/patients-management/@types/caregiver';

const graphqlString = `
      caregiverId
      patientId
      id
       relation
      emergency
      note
      caregiver{
      id
      firstName
      middleName
      lastName
      email
      phone
      }
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
      query: this.nestJsQueriesService.getManyQuery('patientCaregiver', graphqlString),
      variables: {
        paging: params && params.paging ? params.paging : undefined,
        filter: params && params.filter ? params.filter : undefined,
        sorting: params && params.sorting ? params.sorting : undefined,
      },
      fetchPolicy: 'no-cache',
    });
  }

  addCaregiversToPatient(patientId: number, caregiver: any): Observable<FetchResult<any>> {
    return this.apollo.mutate({
      mutation: this.nestJsQueriesService.relationalCommandMutation(
        'createOnePatientCaregiver',
        'CreateOnePatientCaregiverInput',
        `id`
      ),
      variables: {
        input: {
          patientCaregiver: {
            patientId,
            note: caregiver.note,
            relation: caregiver.relation,
            emergency: caregiver.emergency,
            caregiverId: caregiver.id,
          },
        },
      },
    });
  }

  updateCaregiversToPatient(
    id: number,
    patientCaregiver: UpdateOnePatientCaregiverInput
  ): Observable<FetchResult<any>> {
    return this.apollo.mutate({
      mutation: this.nestJsQueriesService.relationalCommandMutation(
        'updateOnePatientCaregiver',
        'UpdateOnePatientCaregiverInput',
        `id relation`
      ),
      variables: {
        input: {
          id,
          update: patientCaregiver,
        },
      },
      fetchPolicy: 'no-cache',
    });
  }

  removeCaregiversFromPatient(id: number): Observable<FetchResult<any>> {
    return this.apollo.mutate({
      mutation: this.nestJsQueriesService.relationalCommandMutation(
        'deleteOnePatientCaregiver',
        'DeleteOnePatientCaregiverInput',
        `id`
      ),
      variables: {
        input: {
          id,
        },
      },
    });
  }
}
