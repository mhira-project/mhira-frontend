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

  getPatients(): Observable<FetchResult<any>> {
    return this.apollo.query({
      query: PatientsQueries.getPatients,
      variables: {},
      fetchPolicy: 'no-cache',
    });
  }

  getPatientManagers(managerType: string, patientId: number): Observable<FetchResult<any>> {
    switch (managerType) {
      case 'informants':
        return this.apollo.query({
          query: PatientsQueries.getPatientInformants,
          variables: { patientId },
          fetchPolicy: 'no-cache',
        });
      case 'caseManagers':
        return this.apollo.query({
          query: PatientsQueries.getPatientCaseManagers,
          variables: { patientId },
          fetchPolicy: 'no-cache',
        });
      default:
        return this.apollo.query({
          query: PatientsQueries.getPatientInformants,
          variables: { patientId },
          fetchPolicy: 'no-cache',
        });
    }
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

  assignClinician(userId: number, patientId: number): Observable<FetchResult<any>> {
    return this.apollo.mutate({
      mutation: PatientsMutations.assignClinician,
      variables: { userId, patientId },
      fetchPolicy: 'no-cache',
    });
  }

  assignInformant(userId: number, patientId: number): Observable<FetchResult<any>> {
    return this.apollo.mutate({
      mutation: PatientsMutations.assignInformant,
      variables: { userId, patientId },
      fetchPolicy: 'no-cache',
    });
  }

  unassignClinician(userId: number, patientId: number): Observable<FetchResult<any>> {
    return this.apollo.mutate({
      mutation: PatientsMutations.unassignClinician,
      variables: { userId, patientId },
      fetchPolicy: 'no-cache',
    });
  }

  unassignInformant(userId: number, patientId: number): Observable<FetchResult<any>> {
    return this.apollo.mutate({
      mutation: PatientsMutations.unassignInformant,
      variables: { userId, patientId },
      fetchPolicy: 'no-cache',
    });
  }
}
