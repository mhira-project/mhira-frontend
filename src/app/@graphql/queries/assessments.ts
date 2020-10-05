import gql from 'graphql-tag';

const getAssessments = gql`
  query {
    getAssessments {
      edges {
        cursor
        node {
          id
          active
          medicalRecordNo
          firstName
          middleName
          lastName
          phone
          email
          address
          gender
          birthDate
          birthCountryCode
          nationality
          updatedAt
          createdAt
        }
      }
      pageInfo {
        startCursor
        endCursor
        hasNextPage
        hasPreviousPage
      }
    }
  }
`;

const getQuestionnaires = gql`
  query (
    $searchKeyword: String, 
    $first: Int, 
    $after: String, 
    $last: Int, 
    $before: String
   ){
    getQuestionnaires(
      searchKeyword:$searchKeyword,
      first:$first, 
      after,$after,
      last:$last, 
      before:$before
   ) {
      edges {
        cursor
        node {
          id
          name
          status
          questions {
            id
            type
            text
            help
            isOptional
            isPersonalInformation
            validationRules {
              minimum
              maximum
              precision
              regex
            }
            validationMessages {
              regex
            }
          }
          updatedAt
          createdAt
        }
      }
      pageInfo {
        startCursor
        endCursor
        hasNextPage
        hasPreviousPage
      }
    }
  }
`;

export const AssessmentsQueries = {
  getAssessments,
  getQuestionnaires,
};
