import gql from 'graphql-tag';

const deleteAssessment = gql`
  mutation($id: Int!) {
    deleteAssessment(id: $id)
  }
`;

export const AssessmentsMutations = {
  deleteAssessment,
};
