import { Injectable } from '@angular/core';
import { Paging } from '@shared/@types/paging';
import { Filter } from '@shared/@types/filter';
import { Sorting } from '@shared/@types/sorting';
import { Observable } from 'rxjs';
import { FetchResult } from 'apollo-link';
import { Apollo } from 'apollo-angular';
import { ReportsQueries } from '@app/@graphql/queries/reports';
import { Reports, UpdateOneReportInput, CreateOneReportInput } from '@app/pages/administration/@types/reports';
import { ReportsMutations } from '@app/@graphql/mutations/reports';
import { NestJsQueriesService } from '@shared/services/nestjs-queries.service';
import { RolesMutations } from '@app/@graphql/mutations/roles';

@Injectable({
  providedIn: 'root',
})
export class ReportsService {
  constructor(private apollo: Apollo, private nestJsQueriesService: NestJsQueriesService) {}

  reports(params?: { paging?: Paging; filter?: Filter; sorting?: Sorting[] }): Observable<FetchResult<any>> {
    return this.apollo.query({
      query: ReportsQueries.reports,
      variables: {
        paging: params && params.paging ? params.paging : undefined,
        filter: params && params.filter ? params.filter : undefined,
        sorting: params && params.sorting ? params.sorting : undefined,
      },
      fetchPolicy: 'no-cache',
    });
  }

  createReport(createOneReportInput: CreateOneReportInput): Observable<FetchResult<any>> {
    return this.apollo.mutate({
      mutation: ReportsMutations.createOneReport,
      variables: { input: createOneReportInput },
      fetchPolicy: 'no-cache',
    });
  }

  updateReport(updateOneReportInput: UpdateOneReportInput): Observable<FetchResult<any>> {
    console.log(updateOneReportInput);
    return this.apollo.mutate({
      mutation: ReportsMutations.updateOneReport,
      variables: { input: updateOneReportInput },
      fetchPolicy: 'no-cache',
    });
  }

  deleteReport(report: Reports): Observable<FetchResult<any>> {
    console.log(report);
    return this.apollo.mutate({
      mutation: ReportsMutations.updateOneReport,
      variables: {
        input: { id: report.id, update: { deletedAt: new Date() } },
      },
      fetchPolicy: 'no-cache',
    });
  }

  addRolesToReport(reportId: number, rolesIds: number[]): Observable<FetchResult<any>> {
    console.log();
    return this.apollo.mutate({
      mutation: ReportsMutations.addRolesToReport,
      variables: {
        input: {
          reportId,
          roleIds: rolesIds,
        },
      },
      fetchPolicy: 'no-cache',
    });
  }
}
