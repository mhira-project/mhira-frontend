import gql from 'graphql-tag';

const uploadQuestionnaire = gql`
  mutation($xlsForm: CreateQuestionnaireInput!) {
    createQuestionnaire(xlsForm: $xlsForm) {
      _id
      name
    }
  }
`;

export const QuestionnaireMutations = {
  uploadQuestionnaire,
};
