import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Apollo } from 'apollo-angular';
import { Filter } from '@app/@shared/@types/filter';
import { Paging } from '@app/@shared/@types/paging';
import { Sorting } from '@app/@shared/@types/sorting';
import { FetchResult } from 'apollo-link';
import { BundleQueries } from '../../../@graphql/queries/bundles';
import { BundleMutations } from '../../../@graphql/mutations/bundles';

@Injectable({
  providedIn: 'root',
})
export class QuestionnaireBundlesService {
  constructor(private apollo: Apollo) {}

  public getQuestionnairesBundles(params?: {
    paging?: Paging;
    filter?: Filter;
    sorting?: Sorting[];
    departmentIds: any[];
  }): Observable<FetchResult<any>> {
    return this.apollo.query({
      query: BundleQueries.getQuestionnaireBundles,
      variables: {
        paging: params && params.paging ? params.paging : undefined,
        filter: params && params.filter ? params.filter : undefined,
        sorting: params && params.sorting ? params.sorting : undefined,
        departmentIds: params && params.departmentIds ? params.departmentIds : undefined,
      },
      fetchPolicy: 'no-cache',
    });
  }

  public getOneQuestionnaireBundle(_id: string): Observable<FetchResult<any>> {
    return this.apollo.query({
      query: BundleQueries.getQuestionnaireBundle,
      variables: {
        _id,
      },
      fetchPolicy: 'no-cache',
    });
  }

  public createQuestionnaireBundle(bundle: any): Observable<FetchResult<any>> {
    return this.apollo.mutate({
      mutation: BundleMutations.createQuestionnaireBundle,
      variables: {
        input: {
          ...bundle,
        },
      },
      fetchPolicy: 'no-cache',
    });
  }

  public updateQuestionnaireBundle(bundle: any): Observable<FetchResult<any>> {
    return this.apollo.mutate({
      mutation: BundleMutations.updateQuestionnaireBundle,
      variables: {
        input: {
          _id: bundle._id,
          name: bundle.name,
          questionnaireIds: bundle.questionnaireIds,
          departmentIds: bundle.departmentIds,
        },
      },
      fetchPolicy: 'no-cache',
    });
  }

  public deleteQuestionnaireBundle(_id: string): Observable<FetchResult<any>> {
    return this.apollo.mutate({
      mutation: BundleMutations.deleteQuestionnaireBundle,
      variables: {
        _id,
      },
      fetchPolicy: 'no-cache',
    });
  }
}
