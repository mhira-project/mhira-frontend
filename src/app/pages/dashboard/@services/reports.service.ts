import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';
import { FetchResult } from 'apollo-link';
import { ReportsByResourcesQueries } from '../../../@graphql/queries/reports-resources';

@Injectable({
  providedIn: 'root',
})
export class ReportsDashboardService {
  constructor(private apollo: Apollo) {}

  getDashboardCaseManagers(): Observable<FetchResult<any>> {
    return this.apollo.query({
      query: ReportsByResourcesQueries.getReportsByResources,
      variables: { resource: 'Dashboard' },
      fetchPolicy: 'no-cache',
    });
  }
}
