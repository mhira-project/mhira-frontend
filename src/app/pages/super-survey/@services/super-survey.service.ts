import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';
import { PageInfo, Paging } from '@shared/@types/paging';
import { Filter } from '@shared/@types/filter';
import { Sorting } from '@shared/@types/sorting';
import { SuperSurveyQueries } from '@app/@graphql/queries/super-survey';
import { FetchResult } from 'apollo-link';
import { ConnectionResult } from '@shared/@types/connection-cursor';
import { FormattedSuperSurvey } from '@app/pages/super-survey/@types/super-survey';
import { map } from 'rxjs/operators'; // Adjust the import path as needed

@Injectable({
  providedIn: 'root',
})
export class SuperSurveyService {
  constructor(private apollo: Apollo) {}

  public getSuperSurveys(options: {
    paging?: Paging;
    filter?: any;
    sorting?: Sorting[];
  }): Observable<{
    edges: { node: FormattedSuperSurvey; cursor: string }[];
    pageInfo: PageInfo;
    totalCount: number;
  }> {
    const mappedVariables = this.mapOldToNewQueryVariables(options);

    return this.apollo
      .use('superSurvey')
      .query<{
        surveyTemplates: {
          edges: { node: FormattedSuperSurvey; cursor: string }[];
          pageInfo: PageInfo;
          totalCount: number;
        };
      }>({
        query: SuperSurveyQueries.getSuperSurveys,
        variables: mappedVariables,
        fetchPolicy: 'no-cache',
      })
      .pipe(
        map(({ data }) => {
          const edges = data.surveyTemplates.edges.map((edge) => ({
            node: edge.node,
            cursor: edge.cursor,
          }));
          const pageInfo = data.surveyTemplates.pageInfo;
          const totalCount = data.surveyTemplates.totalCount;

          return {
            edges,
            pageInfo,
            totalCount,
          };
        })
      );
  }

  private mapOldToNewQueryVariables(options: {
    paging?: Paging;
    filter?: any;
    sorting?: Sorting[];
  }): {
    filter?: any;
    orderBy?: any[];
    after?: string;
    first?: number;
  } {
    // Extract paging parameters
    const { paging } = options;
    const first = paging?.first || 20;
    const after = paging?.after || null;

    // Convert old sorting to the new orderBy structure
    const sorting = options.sorting || [];
    const orderBy = sorting.map((sort) => ({
      field: sort.field,
      direction: sort.direction.toUpperCase(), // Ensure uppercase for 'ASC' or 'DESC'
    }));

    // Return the mapped variables for the new query
    return {
      filter: options.filter || null,
      orderBy,
      after,
      first,
    };
  }

  public getOneSuperSurvey(id: string): Observable<any> {
    return this.apollo
      .use('superSurvey')
      .query({
        query: SuperSurveyQueries.getSuperSurvey,
        variables: {
          id,
        },
        fetchPolicy: 'no-cache',
      })
      .pipe(map((res: any) => res.data?.['surveyTemplate'] ?? null));
  }
}
