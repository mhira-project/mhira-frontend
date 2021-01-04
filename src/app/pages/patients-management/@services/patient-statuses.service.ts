import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';
import { FetchResult } from 'apollo-link';
import { Filter } from '@shared/@types/filter';
import { Sorting } from '@shared/@types/sorting';
import { Paging } from '@shared/@types/paging';
import { PatientStatusesQueries } from '../../../@graphql/queries/patient-statuses';
import { PatientStatusesMutations } from '../../../@graphql/mutations/patient-statuses';
import { PatientStatus } from '../@types/patient-status';

@Injectable({
  providedIn: 'root',
})
export class PatientStatusesService {
  constructor(private apollo: Apollo) {}

  patientStatuses(params?: { paging?: Paging; filter?: Filter; sorting?: Sorting }): Observable<FetchResult<any>> {
    return this.apollo.query({
      query: PatientStatusesQueries.patientStatuses,
      variables: {
        paging: params && params.paging ? params.paging : undefined,
        filter: params && params.filter ? params.filter : undefined,
        sorting: params && params.sorting ? params.sorting : undefined,
      },
      fetchPolicy: 'no-cache',
    });
  }

  createPatientStatus(patientStatus: PatientStatus): Observable<FetchResult<any>> {
    return this.apollo.mutate({
      mutation: PatientStatusesMutations.createOnePatientStatus,
      variables: {
        input: { patientStatus },
      },
      fetchPolicy: 'no-cache',
    });
  }

  updatePatientStatus(patientStatus: PatientStatus): Observable<FetchResult<any>> {
    const id = patientStatus.id;
    delete patientStatus.id;
    return this.apollo.mutate({
      mutation: PatientStatusesMutations.updateOnePatientStatus,
      variables: {
        input: {
          id,
          update: patientStatus,
        },
      },
      fetchPolicy: 'no-cache',
    });
  }

  deletePatientStatus(patientStatus: PatientStatus): Observable<FetchResult<any>> {
    return this.apollo.mutate({
      mutation: PatientStatusesMutations.deleteOnePatientStatus,
      variables: {
        input: { id: patientStatus.id },
      },
      fetchPolicy: 'no-cache',
    });
  }
}
