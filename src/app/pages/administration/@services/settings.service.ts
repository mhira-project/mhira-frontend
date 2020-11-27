import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';
import { FetchResult } from 'apollo-link';
import { Filter } from '@shared/@types/filter';
import { Sorting } from '@shared/@types/sorting';
import { Paging } from '@shared/@types/paging';
import { SettingsQueries } from '../../../@graphql/queries/settings';
import { Setting } from '@app/pages/administration/@types/setting';
import { SettingsMutations } from '@app/@graphql/mutations/settings';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  constructor(private apollo: Apollo) {}

  settings(params?: { paging?: Paging; filter?: Filter; sorting?: Sorting }): Observable<FetchResult<any>> {
    return this.apollo.query({
      query: SettingsQueries.settings,
      variables: {
        paging: params && params.paging ? params.paging : undefined,
        filter: params && params.filter ? params.filter : undefined,
        sorting: params && params.sorting ? params.sorting : undefined,
      },
      fetchPolicy: 'no-cache',
    });
  }

  updateSetting(input: Setting): Observable<FetchResult<any>> {
    return this.apollo.mutate({
      mutation: SettingsMutations.updateSettings,
      variables: { input },

      fetchPolicy: 'no-cache',
    });
  }
}
