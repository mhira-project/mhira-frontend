import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';
import { FetchResult } from 'apollo-link';
import { DisclaimersQueries } from '../../../@graphql/queries/disclaimers';
import { Injectable } from '@angular/core';
import { UpdateDisclaimerInput } from '../@types/disclaimers';
import { DisclaimersMutation } from '../../../@graphql/mutations/disclaimers';

@Injectable({
  providedIn: 'root',
})
export class DisclaimersService {
  constructor(private apollo: Apollo) {}

  disclaimers(): Observable<FetchResult<any>> {
    return this.apollo.query({
      query: DisclaimersQueries.disclaimers,
      variables: {},
      fetchPolicy: 'no-cache',
    });
  }

  updateDisclaimer(updateDisclaimer: UpdateDisclaimerInput): Observable<FetchResult<any>> {
    return this.apollo.mutate({
      mutation: DisclaimersMutation.updateDisclaimer,
      variables: { input: updateDisclaimer },
      fetchPolicy: 'no-cache',
    });
  }
}
