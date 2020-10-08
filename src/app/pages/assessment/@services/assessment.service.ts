import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';
import { FetchResult } from 'apollo-link';
import { AssessmentsQueries } from '../../../@graphql/queries/assessments';
import { Assessment } from '@app/pages/assessment/@types/assessment';
import { AssessmentsMutations } from '@app/@graphql/mutations/assessments';

@Injectable({
  providedIn: 'root',
})
export class AssessmentService {
  constructor(private apollo: Apollo) {}

  getAssessments(params?: { paging?: any; filter?: any; sorting?: any }): Observable<FetchResult<any>> {
    return this.apollo.query({
      query: AssessmentsQueries.assessments,
      variables: {
        paging:
          params && params.paging
            ? {
                before: params.paging.before ? params.paging.before : undefined,
                after: params.paging.after ? params.paging.after : undefined,
                first: params.paging.first ? params.paging.first : undefined,
                last: params.paging.last ? params.paging.last : undefined,
              }
            : undefined,
        filter:
          params && params.filter
            ? {
                and: params.filter.and ? params.filter.and : undefined,
                or: params.filter.or ? params.filter.or : undefined,
                id: params.filter.id ? params.filter.id : undefined,
                date: params.filter.date ? params.filter.date : undefined,
                name: params.filter.name ? params.filter.name : undefined,
                patientId: params.filter.patientId ? params.filter.patientId : undefined,
                clinicianId: params.filter.clinicianId ? params.filter.clinicianId : undefined,
                informantId: params.filter.informantId ? params.filter.informantId : undefined,
                status: params.filter.status ? params.filter.status : undefined,
                createdAt: params.filter.createdAt ? params.filter.createdAt : undefined,
                updatedAt: params.filter.updatedAt ? params.filter.updatedAt : undefined,
              }
            : undefined,
        sorting:
          params && params.sorting
            ? {
                field: params.sorting.field ? params.sorting.field : undefined,
                direction: params.sorting.direction ? params.sorting.direction : undefined,
                nulls: params.sorting.nulls ? params.sorting.nulls : undefined,
              }
            : undefined,
      },
      fetchPolicy: 'no-cache',
    });
  }

  getQuestionnaires(search: string): Observable<FetchResult<any>> {
    /*return this.apollo.query({
      query: AssessmentsQueries.getAssessments,
      variables: {},
      fetchPolicy: 'no-cache',
    });*/
    return new Observable((observer) => {
      const questionnaires: {
        data: {
          getQuestionnaires: {
            edges: any[];
            pageInfo: {
              endCursor: string;
              hasNextPage: boolean;
              hasPreviousPage: boolean;
              startCursor: string;
            };
          };
        };
      } = {
        data: {
          getQuestionnaires: {
            edges: [],
            pageInfo: {
              endCursor: 'dW5kZWZpbmVk',
              hasNextPage: false,
              hasPreviousPage: false,
              startCursor: 'dW5kZWZpbmVk',
            },
          },
        },
      };
      for (let i = 0; i < 10; i++) {
        questionnaires.data.getQuestionnaires.edges.push({
          cursor: 'dW5kZWZpbmVk',
          node: {
            id: i,
            name: `LOPFQ${i} Questionnaire`,
            description: `this is the simple description about LOPFQ${i} Questionnaire`,
            createdAt: '2020-09-22T14:13:46.384Z',
          },
        });
      }
      observer.next(questionnaires);
      observer.complete();
    });
  }

  planAssessment(assessment: Assessment): Observable<FetchResult<any>> {
    return this.apollo.mutate({
      mutation: AssessmentsMutations.planAssessment,
      variables: assessment,
      fetchPolicy: 'no-cache',
    });
  }

  deleteAssessment(assessment: Assessment): Observable<FetchResult<any>> {
    return this.apollo.mutate({
      mutation: AssessmentsMutations.deleteAssessment,
      variables: { id: assessment.id },
      fetchPolicy: 'no-cache',
    });
  }
}
