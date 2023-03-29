import { Apollo } from 'apollo-angular';
import { Paging } from '../../../@shared/@types/paging';
import { Filter } from '../../../@shared/@types/filter';
import { Sorting } from '../../../@shared/@types/sorting';
import { Observable } from 'rxjs';
import { FetchResult } from 'apollo-link';
import { AssessmentAdministrationQueries } from '../../../@graphql/queries/assessment-administration';
import { AssessmentAdministrationMutations } from '../../../@graphql/mutations/assessment-administration';
import { AssessmentAdministration } from '../@types/assessment-administration';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AssessmentAdministrationService {
  constructor(private apollo: Apollo) {}

  assessmentActive(): Observable<FetchResult<any>> {
    return this.apollo.query({
      query: AssessmentAdministrationQueries.assessmentAdministrationActive,
      variables: {},
      fetchPolicy: 'no-cache',
    });
  }

  assessmentAdministration(params?: {
    paging?: Paging;
    filter?: Filter;
    sorting?: Sorting[];
  }): Observable<FetchResult<any>> {
    return this.apollo.query({
      query: AssessmentAdministrationQueries.assessmentAdministration,
      variables: {
        paging: params && params.paging ? params.paging : undefined,
        filter: params && params.filter ? params.filter : undefined,
        sorting: params && params.sorting ? params.sorting : undefined,
      },
      fetchPolicy: 'no-cache',
    });
  }

  createAssessmentType(assessmentType: AssessmentAdministration): Observable<FetchResult<any>> {
    return this.apollo.mutate({
      mutation: AssessmentAdministrationMutations.createOneAssessmentType,
      variables: {
        assessmentType: { ...assessmentType },
      },
      fetchPolicy: 'no-cache',
    });
  }

  updateAssessmentAdministration(assessmentType: AssessmentAdministration): Observable<FetchResult<any>> {
    return this.apollo.mutate({
      mutation: AssessmentAdministrationMutations.updateOneAssessmentType,
      variables: {
        assessmentType: {
          assessmentTypeId: assessmentType.id,
          name: assessmentType.name,
          status: assessmentType.status,
        },
      },
      fetchPolicy: 'no-cache',
    });
  }
  //
  // deleteAssessmentAdministration(role: Role): Observable<FetchResult<any>> {
  //   return this.apollo.mutate({
  //     mutation: AssessmentAdministrationMutations.deleteOneAssessmentAdministration,
  //     variables: {
  //       input: { id: role.id },
  //     },
  //     fetchPolicy: 'no-cache',
  //   });
  // }
}
