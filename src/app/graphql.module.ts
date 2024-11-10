import { NgModule } from '@angular/core';
import { ApolloModule, APOLLO_OPTIONS } from 'apollo-angular';
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { environment } from '../environments/environment';
import { setContext } from 'apollo-link-context';

const hostnames = window.location.hostname.split('.');
let tenantID = '';
if (hostnames.length > 2) {
  tenantID = hostnames[0];
}
const uri = environment.baseURL;

export function createApollo(httpLink: HttpLink) {
  const auth = setContext((operation, context) => ({
    headers: {
      // Temporarily commenting out below line, to avoid CORS error when running the app locally.
      // 'x-tenant-id': tenantID,
    },
  }));

  const http = httpLink.create({ uri });

  return {
    link: auth.concat(http),
    cache: new InMemoryCache(),
  };
}

@NgModule({
  exports: [ApolloModule, HttpLinkModule],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [HttpLink],
    },
  ],
})
export class GraphQLModule {}
