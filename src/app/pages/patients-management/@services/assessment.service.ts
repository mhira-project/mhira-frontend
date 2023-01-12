import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { PageInfo, Paging } from '../../../@shared/@types/paging';
import { Filter } from '../../../@shared/@types/filter';
import { Sorting } from '../../../@shared/@types/sorting';
import { Observable } from 'rxjs';
import { AssessmentsQueries } from '../../../@graphql/queries/assessments';
import { map } from 'rxjs/operators';
import { Assessment, FullAssessment } from '@app/pages/assessment/@types/assessment';
import { FetchResult } from 'apollo-link';
import { AssessmentsMutations } from '@app/@graphql/mutations/assessments';

@Injectable({
  providedIn: 'root',
})
export class AssessmentService {
  constructor(private apollo: Apollo) {}

  getAssessments(params?: {
    paging?: Paging;
    filter?: Filter;
    sorting?: Sorting[];
  }): Observable<{ edges: any; pageInfo: PageInfo }> {
    return this.apollo
      .query({
        query: AssessmentsQueries.assessments,
        variables: {
          paging: params && params.paging ? params.paging : undefined,
          filter: params && params.filter ? params.filter : undefined,
          sorting: params && params.sorting?.length ? params.sorting : undefined,
        },
        fetchPolicy: 'no-cache',
      })
      .pipe(map((result: any) => result.data.assessments));
  }

  getFullAssessment(assessmentId: number, uuid?: string | null): Observable<FullAssessment> {
    return this.apollo
      .query({
        query: AssessmentsQueries.getFullAssessment,
        variables: { id: assessmentId, uuid },
        fetchPolicy: 'no-cache',
      })
      .pipe(map((result: any) => result?.data?.getFullAssessment));
  }

  planAssessment(assessment: Assessment): Observable<FetchResult<any>> {
    return this.apollo.mutate({
      mutation: AssessmentsMutations.createOneAssessment,
      variables: assessment,
      fetchPolicy: 'no-cache',
    });
  }

  deleteAssessment(assessment: Assessment, statusCancel: boolean = true): Observable<boolean> {
    return this.apollo
      .mutate({
        mutation: AssessmentsMutations.deleteAssessment,
        variables: { id: assessment.id, statusCancel },
        fetchPolicy: 'no-cache',
      })
      .pipe(map((result: any) => result?.data?.deleteAssessment));
  }

  archiveAssessment(assessment: Assessment): Observable<boolean> {
    return this.apollo
      .mutate({
        mutation: AssessmentsMutations.archiveOneAssessment,
        variables: { id: assessment.id },
        fetchPolicy: 'no-cache',
      })
      .pipe(map((result: any) => result?.data?.deleteAssessment));
  }

  restoreAssessment(assessment: Assessment): Observable<boolean> {
    return this.apollo
      .mutate({
        mutation: AssessmentsMutations.restoreOneAssessment,
        variables: { id: assessment.id },
        fetchPolicy: 'no-cache',
      })
      .pipe(map((result: any) => result?.data?.deleteAssessment));
  }
}
