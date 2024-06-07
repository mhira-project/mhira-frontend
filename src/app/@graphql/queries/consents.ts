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
      title
      acceptLabel
    }
  }
`;

export const ConsentsQueries = {
  consents,
};
