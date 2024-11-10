import { EnvironmentBase } from './environment.base';

export const environment = {
  ...EnvironmentBase,
  production: true,
  baseURL: 'https://dev-api.mhira.net/graphql',
};
