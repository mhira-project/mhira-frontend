import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';
import { FetchResult } from 'apollo-link';
import { Filter } from '@shared/@types/filter';
import { Sorting } from '@shared/@types/sorting';
import { Paging } from '@shared/@types/paging';
import { ConsentsQueries } from '../../../@graphql/queries/consents';
import { Consent, UpdateOneConsentInput } from '@app/pages/administration/@types/consent';
import { ConsentsMutations } from '@app/@graphql/mutations/consents';

@Injectable({
  providedIn: 'root',
})
export class ConsentsService {
  constructor(private apollo: Apollo) {}

  consents(params?: { paging?: Paging; filter?: Filter; sorting?: Sorting }): Observable<FetchResult<any>> {
    return this.apollo.query({
      query: ConsentsQueries.consents,
      fetchPolicy: 'no-cache',
    });
  }

  createConsent(consent: Consent): Observable<FetchResult<any>> {
    return this.apollo.mutate({
      mutation: ConsentsMutations.createOneConsent,
      variables: {
        input: consent,
      },
      fetchPolicy: 'no-cache',
    });
  }

  updateConsent(updateOneConsentInput: UpdateOneConsentInput): Observable<FetchResult<any>> {
    return this.apollo.mutate({
      mutation: ConsentsMutations.updateOneConsent,
      variables: {
        input: updateOneConsentInput,
      },
      fetchPolicy: 'no-cache',
    });
  }

  deleteConsent(consent: Consent): Observable<FetchResult<any>> {
    return this.apollo.mutate({
      mutation: ConsentsMutations.deleteOneConsent,
      variables: {
        input: { id: consent.id },
      },
      fetchPolicy: 'no-cache',
    });
  }
}
