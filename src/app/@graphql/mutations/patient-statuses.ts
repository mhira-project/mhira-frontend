import gql from 'graphql-tag';

const createOnePatientStatus = gql`
  mutation($input: CreateOnePatientStatusInput!) {
    createOnePatientStatus(input: $input) {
      id
      name
      description
      createdAt
      updatedAt
    }
  }
`;

const updateOnePatientStatus = gql`
  mutation($input: UpdateOnePatientStatusInput!) {
    updateOnePatientStatus(input: $input) {
      id
      name
      description
      createdAt
      updatedAt
    }
  }
`;

const deleteOnePatientStatus = gql`
  mutation($input: DeleteOneInput!) {
    deleteOnePatientStatus(input: $input) {
      id
      name
      description
      createdAt
      updatedAt
    }
  }
`;

export const PatientStatusesMutations = {
  createOnePatientStatus,
  updateOnePatientStatus,
  deleteOnePatientStatus,
};
