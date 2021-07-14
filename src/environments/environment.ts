import { EnvironmentBase } from './environment.base';
export const environment = {
  ...EnvironmentBase,
  hmr: true,
  baseURL: 'https://api.mhira.net/graphql',
};
