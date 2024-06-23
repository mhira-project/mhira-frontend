import gql from 'graphql-tag';

const createOneConsent = gql`
  mutation($input: CreateOneConsentInput!) {
    createOneConsent(input: $input) {
      id
      name
      description
      consent1
      consent2
      consent3
      consent4
      consent5
      consent6
      consent7
      submitContent
      createdAt
      updatedAt
      title
      acceptLabel
      submitLabel
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
      consent3
      consent4
      consent5
      consent6
      consent7
      submitContent
      createdAt
      updatedAt
      title
      acceptLabel
      submitLabel
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
