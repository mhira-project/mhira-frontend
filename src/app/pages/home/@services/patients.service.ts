import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';
import { FetchResult } from 'apollo-link';
import { PatientsMutations } from '../../../@graphql/mutations/patients';
import { PatientsQueries } from '../../../@graphql/queries/patients';
import { Patient } from '../@types/patient';
import { UsersQueries } from '@app/@graphql/queries/users';
import { Paging } from '@shared/@types/paging';
import { Filter } from '@shared/@types/filter';
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

  /*searchPatients(keyword: string) {
    const options: { label: string; value: number }[] = [];
    this.patientService.getPatients({filter: {firstName: {iLike: keyword}}}).subscribe(
      async ({data}) => {
        data.patients.edges.map((patient: any) => {
          const option = {value: patient.node.id, label: `${patient.node.firstName} ${patient.node.lastName}`};
          if (options.indexOf(option) === -1) {
            options.push(option);
          }
        });
        this.caseManagersFilterForm.groups[0].fields[1].options = options;
      },
      (error) => {
        this.isLoading = false;
      }
    );
  }*/

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
