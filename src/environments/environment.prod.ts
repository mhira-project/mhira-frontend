import { EnvironmentBase } from './environment.base';

export const environment = {
  ...EnvironmentBase,
  production: true,
  baseURL: 'https://api.mhira.net/graphql',
};
