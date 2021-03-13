import gql from 'graphql-tag';

const getQuestionnaires = gql`
  query($filters: ListQuestionnaireInput!) {
    questionnaires(filters: $filters) {
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

export const QuestionnaireQueries = {
  getQuestionnaires,
};
