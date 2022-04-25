import gql from 'graphql-tag';

const updateDisclaimer = gql`
  mutation($input: UpdateDisclaimerInput!) {
    updateDisclaimer(input: $input) {
      type
      description
      updatedAt
    }
  }
`;

export const DisclaimersMutation = {
  updateDisclaimer,
};
