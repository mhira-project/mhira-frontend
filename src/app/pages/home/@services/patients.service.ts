import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';
import { FetchResult } from 'apollo-link';
import { PatientsMutations } from '../../../@graphql/mutations/patients';
import { PatientsQueries } from '../../../@graphql/queries/patients';
import { Patient } from '../home.interfaces';
import { UsersQueries } from '@app/@graphql/queries/users';

@Injectable({
  providedIn: 'root',
})
export class PatientsService {
  constructor(private apollo: Apollo) {}

  getPatients(filter?: {
    first?: number;
    after?: string;
    last?: number;
    before?: string;
    searchKeyword?: string;
    active?: boolean;
    createdAtFrom?: string;
    createdAtTo?: string;
    caseManagerId?: number;
  }): Observable<FetchResult<any>> {
    return this.apollo.query({
      query: PatientsQueries.getPatients,
      variables: filter,
      fetchPolicy: 'no-cache',
    });
  }

  getPatientManagers(
    query: string,
    filter?: {
      first?: number;
      after?: string;
      last?: number;
      before?: string;
      searchKeyword?: string;
      patientId?: number;
      caseManagerId?: number;
    }
  ): Observable<FetchResult<any>> {
    let result: Observable<FetchResult<any>>;
    switch (query) {
      case 'getPatientCaseManagers':
        result = this.apollo.query({
          query: PatientsQueries.getPatientCaseManagers,
          variables: filter,
          fetchPolicy: 'no-cache',
        });
        break;
      case 'getPatientInformants':
        result = this.apollo.query({
          query: PatientsQueries.getPatientInformants,
          variables: filter,
          fetchPolicy: 'no-cache',
        });
        break;
      default:
        result = this.apollo.query({
          query: PatientsQueries.getPatientInformants,
          variables: filter,
          fetchPolicy: 'no-cache',
        });
        break;
    }
    return result;
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

  assignManager(query: string, userId: number, patientId: number): Observable<FetchResult<any>> {
    let result: Observable<FetchResult<any>>;
    switch (query) {
      case 'assignPatientCaseManager':
        result = this.apollo.mutate({
          mutation: PatientsMutations.assignPatientCaseManager,
          variables: { userId, patientId },
          fetchPolicy: 'no-cache',
        });
        break;
      case 'assignPatientInformant':
        result = this.apollo.mutate({
          mutation: PatientsMutations.assignPatientInformant,
          variables: { userId, patientId },
          fetchPolicy: 'no-cache',
        });
        break;
      default:
        result = this.apollo.mutate({
          mutation: PatientsMutations.assignPatientInformant,
          variables: { userId, patientId },
          fetchPolicy: 'no-cache',
        });
        break;
    }
    return result;
  }

  unassignManager(query: string, userId: number, patientId: number): Observable<FetchResult<any>> {
    let result: Observable<FetchResult<any>>;
    switch (query) {
      case 'unassignPatientCaseManager':
        result = this.apollo.mutate({
          mutation: PatientsMutations.unassignPatientCaseManager,
          variables: { userId, patientId },
          fetchPolicy: 'no-cache',
        });
        break;
      case 'unassignPatientInformant':
        result = this.apollo.mutate({
          mutation: PatientsMutations.unassignPatientInformant,
          variables: { userId, patientId },
          fetchPolicy: 'no-cache',
        });
        break;
      default:
        result = this.apollo.mutate({
          mutation: PatientsMutations.unassignPatientInformant,
          variables: { userId, patientId },
          fetchPolicy: 'no-cache',
        });
        break;
    }
    return result;
  }
}
