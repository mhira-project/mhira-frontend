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
      description
      website
      license
      timeToComplete
      language
      abbreviation
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
      description
      website
      license
      timeToComplete
      language
      abbreviation
    }
  }
`;

const deleteQuestionnaire = gql`
  mutation($_id: String!) {
    deleteQuestionnaire(_id: $_id) {
      _id
    }
  }
`;

export const QuestionnaireMutations = {
  createQuestionnaire,
  updateQuestionnaire,
  deleteQuestionnaire,
};
