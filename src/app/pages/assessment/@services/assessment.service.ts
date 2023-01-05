import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';
import { FetchResult } from 'apollo-link';
import { AssessmentsQueries } from '../../../@graphql/queries/assessments';
import { Assessment, AssessmentStatus } from '@app/pages/assessment/@types/assessment';
import { AssessmentsMutations } from '@app/@graphql/mutations/assessments';
import { Filter } from '@shared/@types/filter';
import { Sorting } from '@shared/@types/sorting';
import { Paging } from '@shared/@types/paging';
import { map } from 'rxjs/operators';
import { FullAssessment } from '../@types/assessment';
import { PageInfo } from '../../../@shared/@types/paging';
import { AnswerAssessmentInput } from '@app/assessment-form/@types/answer';
import { Answer } from '../../../assessment-form/@types/answer';

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

  deleteAssessment(assessment: Assessment, statusCancel: boolean): Observable<boolean> {
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

  getFullAssessment(assessmentId: number, uuid?: string | null): Observable<FullAssessment> {
    return this.apollo
      .query({
        query: AssessmentsQueries.getFullAssessment,
        variables: { id: assessmentId, uuid },
        fetchPolicy: 'no-cache',
      })
      .pipe(map((result: any) => result?.data?.getFullAssessment));
  }

  getFullPublicAssessment(assessmentUuid: string): Observable<FullAssessment> {
    return this.apollo
      .query({
        query: AssessmentsQueries.getFullPublicAssessment,
        variables: { uuid: assessmentUuid },
        fetchPolicy: 'no-cache',
      })
      .pipe(map((result: any) => result?.data?.getFullPublicAssessment));
  }

  addAnswer(assessment: AnswerAssessmentInput): Observable<Answer[]> {
    return this.apollo
      .mutate({
        mutation: AssessmentsMutations.addAnswer,
        variables: { assessment },
        fetchPolicy: 'no-cache',
      })
      .pipe(map((result: any) => result.data.addAnswer.answers));
  }

  sendAssessmentEmail(assessment: Assessment): Observable<boolean> {
    return this.apollo
      .mutate({
        mutation: AssessmentsMutations.sendAssessmentEmail,
        variables: { assessmentId: assessment.id },
        fetchPolicy: 'no-cache',
      })
      .pipe(map((result: any) => result?.data?.deleteAssessment));
  }

  changeAssessmentStatus(assessmentId: string, status: AssessmentStatus) {
    return this.apollo.mutate({
      mutation: AssessmentsMutations.changeAssessmentStatus,
      variables: { statusInput: { assessmentId, status } },
      fetchPolicy: 'no-cache',
    });
  }
}
