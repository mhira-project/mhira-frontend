import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';
import { FetchResult } from 'apollo-link';
import { PatientsMutations } from '@app/@graphql/mutations/patients';
import { PatientsQueries } from '@app/@graphql/queries/patients';
import { Patient } from '../@types/patient';
import { UsersQueries } from '@app/@graphql/queries/users';
import { Paging } from '@shared/@types/paging';
import { Sorting } from '@shared/@types/sorting';

@Injectable({
  providedIn: 'root',
})
export class PatientsService {
  constructor(private apollo: Apollo) {}

  getPatients(params?: { paging?: Paging; filter?: any; sorting?: Sorting }): Observable<FetchResult<any>> {
    return this.apollo.query({
      query: PatientsQueries.getPatients,
      variables: {
        paging: params && params.paging ? params.paging : undefined,
        filter: params && params.filter ? params.filter : undefined,
        sorting: params && params.sorting ? params.sorting : undefined,
      },
      fetchPolicy: 'no-cache',
    });
  }

  searchUser(searchKeyword: string): Observable<FetchResult<any>> {
    return this.apollo.query({
      query: UsersQueries.getUsers,
      variables: { searchKeyword },
      fetchPolicy: 'no-cache',
    });
  }

  createPatient(patient: Patient): Observable<FetchResult<any>> {
    return this.apollo.mutate({
      mutation: PatientsMutations.createPatient,
      variables: patient,
      fetchPolicy: 'no-cache',
    });
  }

  updatePatient(patient: Patient): Observable<FetchResult<any>> {
    return this.apollo.mutate({
      mutation: PatientsMutations.updatePatient,
      variables: patient,
      fetchPolicy: 'no-cache',
    });
  }

  deletePatient(patient: Patient): Observable<FetchResult<any>> {
    return this.apollo.mutate({
      mutation: PatientsMutations.deletePatient,
      variables: { id: patient.id },
      fetchPolicy: 'no-cache',
    });
  }
}
