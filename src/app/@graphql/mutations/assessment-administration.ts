import gql from 'graphql-tag';

const createOneAssessmentType = gql`
  mutation($assessmentType: CreateAssessmentTypeInput!) {
    createNewAssessmentType(assessmentType: $assessmentType) {
      id
      name
      status
      createdAt
      updatedAt
    }
  }
`;

const updateOneAssessmentType = gql`
  mutation($assessmentType: UpdateAssessmentTypeInput!) {
    updateAssessmentType(assessmentType: $assessmentType) {
      id
      name
      status
      createdAt
      updatedAt
    }
  }
`;

const deleteOneAssessmentType = gql`
  mutation($input: DeleteOneInput!) {
    deleteOnePatientStatus(input: $input) {
      id
      name
      description
      status
      createdAt
      updatedAt
    }
  }
`;

export const AssessmentAdministrationMutations = {
  createOneAssessmentType,
  updateOneAssessmentType,
  deleteOneAssessmentType,
};
