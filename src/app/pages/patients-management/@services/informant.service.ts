import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';
import { InformantsQueries } from '@app/@graphql/queries/informants';
import { Informant } from '../@types/informant';
import { InformantsMutations } from '@app/@graphql/mutations/informants';
import { FetchResult } from 'apollo-link';
import { Paging } from '@shared/@types/paging';
import { Sorting } from '@shared/@types/sorting';

@Injectable({
  providedIn: 'root',
})
export class InformantService {
  constructor(private apollo: Apollo) {}

  informants(params?: { paging?: Paging; filter?: any; sorting?: Sorting }): Observable<FetchResult<any>> {
    return this.apollo.query({
      query: InformantsQueries.informants,
      variables: {
        paging: params && params.paging ? params.paging : undefined,
        filter: params && params.filter ? params.filter : undefined,
        sorting: params && params.sorting ? params.sorting : undefined,
      },
      fetchPolicy: 'no-cache',
    });
  }

  createInformant(informant: Informant): Observable<FetchResult<any>> {
    informant.createdAt = undefined;
    return this.apollo.mutate({
      mutation: InformantsMutations.createOneInformant,
      variables: {
        input: { informant },
      },
    });
  }

  updateInformant(informant: Informant): Observable<FetchResult<any>> {
    const id = informant.id;
    informant.id = undefined;
    informant.createdAt = undefined;
    return this.apollo.mutate({
      mutation: InformantsMutations.updateOneInformant,
      variables: {
        input: {
          id,
          update: informant,
        },
      },
    });
  }

  deleteInformant(informant: Informant): Observable<FetchResult<any>> {
    return this.apollo.mutate({
      mutation: InformantsMutations.deleteOneInformant,
      variables: {
        input: { id: informant.id },
      },
    });
  }
}
