import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';
import { FetchResult } from 'apollo-link';
import { CaseManagersQueries } from '@app/@graphql/queries/case-managers';
import { CaseManagerFilter } from '@app/pages/home/@types/case-manager-filter';

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
}
