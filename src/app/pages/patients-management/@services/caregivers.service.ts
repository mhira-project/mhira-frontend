import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Paging } from '../../../@shared/@types/paging';
import { Filter } from '../../../@shared/@types/filter';
import { Sorting } from '../../../@shared/@types/sorting';
import { Observable } from 'rxjs';
import { FetchResult } from 'apollo-link';
import { Caregiver, UpdateOneCaregiverInput } from '../@types/caregiver';
import { CaregiversMutations } from '../../../@graphql/mutations/caregivers';
import { CaregiversQueries } from '@app/@graphql/queries/caregivers';

@Injectable({
  providedIn: 'root',
})
export class CaregiversService {
  constructor(private apollo: Apollo) {}

  caregivers(params?: { paging?: Paging; filter?: Filter; sorting?: Sorting[] }): Observable<FetchResult<any>> {
    return this.apollo.query({
      query: CaregiversQueries.caregivers,
      variables: {
        paging: params && params.paging ? params.paging : undefined,
        filter: params && params.filter ? params.filter : undefined,
        sorting: params && params.sorting ? params.sorting : undefined,
      },
      fetchPolicy: 'no-cache',
    });
  }

  createCaregiver(caregiver: Caregiver): Observable<FetchResult<any>> {
    return this.apollo.mutate({
      mutation: CaregiversMutations.createOneCaregiver,
      variables: {
        input: { caregiver },
      },
      fetchPolicy: 'no-cache',
    });
  }

  createManyCaregivers(caregivers: Caregiver[]): Observable<FetchResult<any>> {
    return this.apollo.mutate({
      mutation: CaregiversMutations.createManyCaregivers,
      variables: {
        input: { caregivers },
      },
      fetchPolicy: 'no-cache',
    });
  }

  updateCaregiver(caregiver: UpdateOneCaregiverInput): Observable<FetchResult<any>> {
    return this.apollo.mutate({
      mutation: CaregiversMutations.updateOneCaregiver,
      variables: {
        input: caregiver,
      },
      fetchPolicy: 'no-cache',
    });
  }

  addCaregiversToPatient(patientId: number, caregiversIds: number[]): Observable<FetchResult<any>> {
    return this.apollo.mutate({
      mutation: CaregiversMutations.addCaregiversToPatient,
      variables: {
        input: {
          id: patientId,
          relationIds: caregiversIds,
        },
      },
      fetchPolicy: 'no-cache',
    });
  }

  removeCaregiversFromPatient(patientId: number, caregiversIds: number[]): Observable<FetchResult<any>> {
    return this.apollo.mutate({
      mutation: CaregiversMutations.removeCaregiverFromPatient,
      variables: {
        input: {
          id: patientId,
          relationIds: caregiversIds,
        },
      },
      fetchPolicy: 'no-cache',
    });
  }

  deleteCaregiver(caregiver: Caregiver): Observable<FetchResult<any>> {
    console.log(caregiver);
    return this.apollo.mutate({
      mutation: CaregiversMutations.updateOneCaregiver,
      variables: {
        input: { id: caregiver.id, update: { deletedAt: new Date() } },
      },
      fetchPolicy: 'no-cache',
    });
  }

  deleteCaregiverPatient(patientCaregiverId: number): Observable<FetchResult<any>> {
    return this.apollo.mutate({
      mutation: CaregiversMutations.deleteCaregiverPatient,
      variables: {
        input: { id: patientCaregiverId },
      },
      fetchPolicy: 'no-cache',
    });
  }
}
