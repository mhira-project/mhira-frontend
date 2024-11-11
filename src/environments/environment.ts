import { EnvironmentBase } from './environment.base';
export const environment = {
  ...EnvironmentBase,
  hmr: true,
  email: true,
  // baseURL: 'http://localhost:3000/graphql',
  baseURL: 'https://dev.mhira.app/graphql',
  superSurveyURL: 'https://q-box.mhira.app/graphql',
};
