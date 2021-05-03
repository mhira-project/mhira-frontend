import { EnvironmentBase } from './environment.base';
export const environment = {
  ...EnvironmentBase,
  hmr: true,
  baseURL: 'https://dev-api.mhira.net/graphql', // 'http://localhost:3000/graphql',
};
