import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';
import { FetchResult } from 'apollo-link';
import { AssessmentsQueries } from '../../../@graphql/queries/assessments';
import { Assessment } from '@app/pages/assessment/@types/assessment';
import { AssessmentsMutations } from '@app/@graphql/mutations/assessments';
import { Filter } from '@shared/@types/filter';
import { Sorting } from '@shared/@types/sorting';
import { Paging } from '@shared/@types/paging';
import { AssessmentFilter } from '@app/pages/assessment/@types/assessment-filter';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AssessmentService {
  constructor(private apollo: Apollo) {}

  getAssessments(params?: {
    paging?: Paging;
    filter?: AssessmentFilter;
    sorting?: Sorting[];
  }): Observable<FetchResult<any>> {
    return this.apollo.query({
      query: AssessmentsQueries.assessments,
      variables: {
        paging: params && params.paging ? params.paging : undefined,
        filter: params && params.filter ? params.filter : undefined,
        sorting: params && params.sorting ? params.sorting : undefined,
      },
      fetchPolicy: 'no-cache',
    });
  }

  getQuestionnaires(params?: { paging?: Paging; filter?: Filter; sorting?: Sorting }): Observable<FetchResult<any>> {
    return this.apollo.query({
      query: AssessmentsQueries.questionnaires,
      variables: {
        paging: params && params.paging ? params.paging : undefined,
        filter: params && params.filter ? params.filter : undefined,
        sorting: params && params.sorting ? params.sorting : undefined,
      },
      fetchPolicy: 'no-cache',
    });
  }

  planAssessment(assessment: Assessment): Observable<FetchResult<any>> {
    return this.apollo.mutate({
      mutation: AssessmentsMutations.createOneAssessment,
      variables: assessment,
      fetchPolicy: 'no-cache',
    });
  }

  updateAssessment(assessment: Assessment): Observable<FetchResult<any>> {
    return this.apollo.mutate({
      mutation: AssessmentsMutations.updateOneAssessment,
      variables: assessment,
      fetchPolicy: 'no-cache',
    });
  }

  deleteAssessment(assessment: Assessment): Observable<FetchResult<any>> {
    return this.apollo.mutate({
      mutation: AssessmentsMutations.deleteOneAssessment,
      variables: { id: assessment.id },
      fetchPolicy: 'no-cache',
    });
  }

  createMongoAssessment(assessment: {}) {
    return this.apollo.mutate({
      mutation: AssessmentsMutations.createOneMongoAssessment,
      variables: { assessment },
      fetchPolicy: 'no-cache',
    });
  }

  updateMongoAssessment(assessment: any) {
    return this.apollo.mutate({
      mutation: AssessmentsMutations.updateOneMongoAssessment,
      variables: { assessment },
      fetchPolicy: 'no-cache',
    });
  }

  getAssessment(assessmentId: number) {
    return this.apollo
      .query({
        query: AssessmentsQueries.getMongoAssessment,
        variables: { id: assessmentId },
        fetchPolicy: 'no-cache',
      })
      .pipe(map((result: any) => result?.data?.getMongoAssessment));
  }
}
