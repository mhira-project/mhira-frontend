import gql from 'graphql-tag';

const disclaimers = gql`
  query {
    disclaimers {
      type
      description
      updatedAt
    }
  }
`;

export const DisclaimersQueries = {
  disclaimers,
};
