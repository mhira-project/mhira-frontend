import { EnvironmentBase } from './environment.base';
export const environment = {
  ...EnvironmentBase,
  hmr: true,
  baseURL: 'http://localhost:3000/graphql',
};
