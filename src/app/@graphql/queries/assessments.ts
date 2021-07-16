import gql from 'graphql-tag';

const assessments = gql`
  query ($paging: CursorPaging, $filter: AssessmentFilter, $sorting: [AssessmentSort!]) {
    assessments(paging: $paging, filter: $filter, sorting: $sorting) {
      edges {
        cursor
        node {
          id
          date
          name
          patientId
          clinicianId
          status
          createdAt
          updatedAt
          deletedAt
          informant
          clinician {
            id
            username
            active
            firstName
            middleName
            lastName
            email
            phone
            workID
            address
            gender
            birthDate
            nationality
            createdAt
            updatedAt
          }
          patient {
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
            createdAt
            updatedAt
          }
          questionnaireAssessment {
            status
          }
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

const questionnaires = gql`
  query ($paging: CursorPaging, $filter: AssessmentFilter, $sorting: [AssessmentSort!]) {
    questionnaires(paging: $paging, filter: $filter, sorting: $sorting) {
      edges {
        cursor
        node {
          id
          name
          version
          abbreviation
          language
          timeToComplete
          description
          copyright
          license
          website
          references
          icd10
          createdAt
          updatedAt
          deletedAt
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
const c = `questionnaires {
            id
            name
            version
            abbreviation
            language
            timeToComplete
            description
            copyright
            license
            website
            references
            icd10
            createdAt
            updatedAt
          }`;

const getFullAssessment = gql`
  query ($id: Int!) {
    getFullAssessment(id: $id) {
      id
      date
      name
      status
      createdAt
      updatedAt
      deletedAt
      informant
      patientId
      clinicianId
      questionnaireAssessmentId
      questionnaireAssessment {
        _id
        status
        answers {
          question
          textValue
          multipleChoiceValue
          numberValue
          dateValue
          booleanValue
        }
        questionnaires(populate: true) {
          _id
          name
          status
          createdAt
          keywords
          copyright
          website
          license
          timeToComplete
          questionnaire {
            language
            abbreviation
          }
          questionGroups {
            label
            questions {
              _id
              name
              label
              type
              hint
              relevant
              calculation
              constraint
              constraintMessage
              min
              max
              required
              requiredMessage
              image
              appearance
              default
              choices {
                name
                label
                image
              }
            }
          }
        }
      }
      clinician {
        id
        username
        active
        firstName
        middleName
        lastName
        email
        phone
        workID
        address
        gender
        birthDate
        nationality
        createdAt
        updatedAt
      }
      patient {
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
        createdAt
        updatedAt
      }
    }
  }
`;

export const AssessmentsQueries = {
  assessments,
  questionnaires,
  getFullAssessment,
};
