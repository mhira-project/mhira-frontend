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
      consent3
      consent4
      consent5
      consent6
      consent7
      createdAt
      title
      acceptLabel
      submitLabel
    }
  }
`;

export const ConsentsQueries = {
  consents,
};
