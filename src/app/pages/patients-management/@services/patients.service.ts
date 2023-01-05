import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';
import { FetchResult } from 'apollo-link';
import { PatientsMutations } from '@app/@graphql/mutations/patients';
import { PatientsQueries } from '@app/@graphql/queries/patients';
import { Patient } from '../@types/patient';
import { Paging } from '@shared/@types/paging';
import { Sorting } from '@shared/@types/sorting';

@Injectable({
  providedIn: 'root',
})
export class PatientsService {
  constructor(private apollo: Apollo) {}

  patients(params?: { paging?: Paging; filter?: any; sorting?: Sorting[] }): Observable<FetchResult<any>> {
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

  createPatient(patient: Patient): Observable<FetchResult<any>> {
    return this.apollo.mutate({
      mutation: PatientsMutations.createPatient,
      variables: {
        input: { patient },
      },
      fetchPolicy: 'no-cache',
    });
  }

  updatePatient(patient: Patient): Observable<FetchResult<any>> {
    const id = patient.id;
    patient.id = undefined;
    return this.apollo.mutate({
      mutation: PatientsMutations.updatePatient,
      variables: {
        input: {
          id,
          update: patient,
        },
      },
      fetchPolicy: 'no-cache',
    });
  }

  deletePatient(patient: Patient): Observable<FetchResult<any>> {
    return this.apollo.mutate({
      mutation: PatientsMutations.deletePatient,
      variables: {
        input: { id: patient.id },
      },
      fetchPolicy: 'no-cache',
    });
  }

  archivePatient(patient: Patient): Observable<FetchResult<any>> {
    return this.apollo.mutate({
      mutation: PatientsMutations.archiveOnePatient,
      variables: {
        id: patient.id,
      },
      fetchPolicy: 'no-cache',
    });
  }

  restorePatient(patient: Patient): Observable<FetchResult<any>> {
    return this.apollo.mutate({
      mutation: PatientsMutations.restorePatient,
      variables: {
        id: patient.id,
      },
      fetchPolicy: 'no-cache',
    });
  }

  removeStatusFromPatient(relationInput: { patientId: number; statusId: number }): Observable<FetchResult<any>> {
    return this.apollo.mutate({
      mutation: PatientsMutations.removeStatusFromPatient,
      variables: {
        input: {
          id: relationInput.patientId,
          relationId: relationInput.statusId,
        },
      },
      fetchPolicy: 'no-cache',
    });
  }
}
