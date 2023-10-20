import { EnvironmentBase } from './environment.base';
export const environment = {
  ...EnvironmentBase,
  hmr: true,
  email: true,
  baseURL: 'http://localhost:3000/graphql' ,
};
