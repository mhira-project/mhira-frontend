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

  getAssessments(): Observable<FetchResult<any>> {
    /*return this.apollo.query({
      query: AssessmentsQueries.getAssessments,
      variables: {},
      fetchPolicy: 'no-cache',
    });*/
    return new Observable((observer) => {
      const assessments: {
        data: {
          getAssessments: {
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
          getAssessments: {
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
        assessments.data.getAssessments.edges.push({
          cursor: 'dW5kZWZpbmVk',
          node: {
            id: i,
            active: i % 5 !== 0,
            firstName: 'Edgar',
            middleName: 'Emmanuel',
            lastName: 'Alexander',
            hospitalId: 'hk23342',
            clinician: {
              id: 31,
              firstName: 'Eric',
              middleName: 'Justo',
              lastName: 'Maro',
            },
            plannedDate: '2020-09-22T14:13:46.384Z',
            firstVisit: '2020-09-22T14:13:46.384Z',
          },
        });
      }
      observer.next(assessments);
      observer.complete();
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
