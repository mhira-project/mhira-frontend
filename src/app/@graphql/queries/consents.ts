import gql from 'graphql-tag';

const consents = gql`
  query {
    consents {
      id
      name
      description
      submitContent
      consent1
      consent2
      createdAt
    }
  }
`;

export const ConsentsQueries = {
  consents,
};
