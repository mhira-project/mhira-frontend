import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';
import { FetchResult } from 'apollo-link';
import { PatientsMutations } from '../../../@graphql/mutations/patients';
import { PatientsQueries } from '../../../@graphql/queries/patients';
import { Patient } from '../home.interfaces';

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
      variables: { input: patient, patientId: patient.id },
      fetchPolicy: 'no-cache',
    });
  }

  deletePatient(patient: Patient): Observable<FetchResult<any>> {
    return this.apollo.mutate({
      mutation: PatientsMutations.deletePatient,
      variables: { patientId: patient.id },
      fetchPolicy: 'no-cache',
    });
  }
}
