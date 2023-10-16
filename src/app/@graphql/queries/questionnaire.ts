import gql from 'graphql-tag';

const getQuestionnaires = gql`
  query($paging: CursorPaging, $filter: QuestionnaireFilter, $sorting: [QuestionnaireSort!]) {
    questionnaires(paging: $paging, filter: $filter, sorting: $sorting) {
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
      edges {
        node {
          _id
          name
          zombie
          status
          createdAt
          keywords
          description
          copyright
          website
          license
          timeToComplete
          language
          abbreviation
        }
      }
    }
  }
`;
const getQuestionnairesVersion = gql`
  query($paging: CursorPaging, $filter: QuestionnaireVersionFilter, $sorting: [QuestionnaireVersionSort!]) {
    getQuestionnaireVersions(paging: $paging, filter: $filter, sorting: $sorting) {
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
      edges {
        node {
          _id
          name
          status
          createdAt
          keywords
          description
          copyright
          website
          license
          timeToComplete
          language
          abbreviation
        }
      }
    }
  }
`;

export const QuestionnaireQueries = {
  getQuestionnaires,
  getQuestionnairesVersion,
};
