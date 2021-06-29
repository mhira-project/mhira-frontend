import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';
import { FetchResult } from 'apollo-link';
import { CaseManagersQueries } from '@app/@graphql/queries/case-managers';
import { CaseManagerFilter } from '@app/pages/patients-management/@types/case-manager-filter';
import { CaseManagersMutations } from '@app/@graphql/mutations/case-managers';
import { Paging } from '@app/@shared/@types/paging';
import { Sorting } from '@app/@shared/@types/sorting';

@Injectable({
  providedIn: 'root',
})
export class CaseManagersService {
  constructor(private apollo: Apollo) {}

  getPatientCaseManagers(filter?: CaseManagerFilter): Observable<FetchResult<any>> {
    return this.apollo.query({
      query: CaseManagersQueries.getPatientCaseManagers,
      variables: filter,
      fetchPolicy: 'no-cache',
    });
  }

  getPatientInformants(filter?: CaseManagerFilter): Observable<FetchResult<any>> {
    return this.apollo.query({
      query: CaseManagersQueries.getPatientInformants,
      variables: filter,
      fetchPolicy: 'no-cache',
    });
  }

  assignPatientCaseManager(relationship: { userId: number; patientId: number }): Observable<FetchResult<any>> {
    return this.apollo.mutate({
      mutation: CaseManagersMutations.assignPatientCaseManager,
      variables: {
        userId: relationship.userId,
        patientId: relationship.patientId,
      },
      fetchPolicy: 'no-cache',
    });
  }

  assignPatientInformant(relationship: { userId: number; patientId: number }): Observable<FetchResult<any>> {
    return this.apollo.mutate({
      mutation: CaseManagersMutations.assignPatientInformant,
      variables: {
        userId: relationship.userId,
        patientId: relationship.patientId,
      },
      fetchPolicy: 'no-cache',
    });
  }

  unassignPatientCaseManager(relationship: { userId: number; patientId: number }): Observable<FetchResult<any>> {
    return this.apollo.mutate({
      mutation: CaseManagersMutations.unassignPatientCaseManager,
      variables: {
        userId: relationship.userId,
        patientId: relationship.patientId,
      },
      fetchPolicy: 'no-cache',
    });
  }

  unassignPatientInformant(relationship: { userId: number; patientId: number }): Observable<FetchResult<any>> {
    return this.apollo.mutate({
      mutation: CaseManagersMutations.unassignPatientInformant,
      variables: {
        userId: relationship.userId,
        patientId: relationship.patientId,
      },
      fetchPolicy: 'no-cache',
    });
  }
}
