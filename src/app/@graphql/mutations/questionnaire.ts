import gql from 'graphql-tag';

const createQuestionnaire = gql`
  mutation($xlsForm: CreateQuestionnaireInput!) {
    createQuestionnaire(xlsForm: $xlsForm) {
      _id
      name
      status
      createdAt
      keywords
      copyright
      website
      license
      timeToComplete
    }
  }
`;

const updateQuestionnaire = gql`
  mutation($_id: String!, $xlsForm: UpdateQuestionnaireInput!) {
    updateQuestionnaire(_id: $_id, xlsForm: $xlsForm) {
      _id
      name
      status
      createdAt
      keywords
      copyright
      website
      license
      timeToComplete
    }
  }
`;

export const QuestionnaireMutations = {
  createQuestionnaire,
  updateQuestionnaire,
};
