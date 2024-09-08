import { EnvironmentBase } from './environment.base';
export const environment = {
  ...EnvironmentBase,
  hmr: true,
  email: true,
  baseURL: 'https://dev.mhira.app/graphql',
  surveyServiceURL: 'http://localhost:8001',
};
