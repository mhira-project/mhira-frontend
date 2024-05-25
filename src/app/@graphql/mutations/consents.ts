import gql from 'graphql-tag';

const createOneConsent = gql`
  mutation($input: CreateOneConsentInput!) {
    createOneConsent(input: $input) {
      id
      name
      description
      consent1
      consent2
      submitContent
      createdAt
      updatedAt
    }
  }
`;

const updateOneConsent = gql`
  mutation($input: UpdateOneConsentInput!) {
    updateOneConsent(input: $input) {
      id
      name
      description
      consent1
      consent2
      submitContent
      createdAt
      updatedAt
    }
  }
`;

const deleteOneConsent = gql`
  mutation($input: DeleteOneConsentInput!) {
    deleteOneConsent(input: $input) {
      id
    }
  }
`;

export const ConsentsMutations = {
  createOneConsent,
  updateOneConsent,
  deleteOneConsent,
};
