import gql from 'graphql-tag';

const assessments = gql`
  query($paging: CursorPaging, $filter: AssessmentFilter, $sorting: [AssessmentSort!]) {
    assessments(paging: $paging, filter: $filter, sorting: $sorting) {
      edges {
        cursor
        node {
          id
          uuid
          date
          assessmentType {
            id
            name
          }
          emailReminder
          emailStatus
          receiverEmail
          patientId
          mailTemplateId
          clinicianId
          submissionDate
          status
          deliveryDate
          expirationDate
          note
          createdAt
          updatedAt
          deletedAt
          informantType
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
          informantClinician {
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
            deletedAt
          }
          informantCaregiverRelation
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
            questionnaireBundles{
              _id
              name
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
              language
              abbreviation
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
  query($paging: CursorPaging, $filter: AssessmentFilter, $sorting: [AssessmentSort!]) {
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
  query($id: Int!) {
    getFullAssessment(id: $id) {
      id
      uuid
      isActive
      date
      assessmentType {
        id
        name
      }
      emailReminder
      emailStatus
      receiverEmail
      mailTemplateId
      status
      deliveryDate
      expirationDate
      note
      createdAt
      updatedAt
      deletedAt
      informantType
      informantCaregiverRelation
      patientId
      clinicianId
      questionnaireAssessmentId
      informantClinician {
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
        deletedAt
      }
      questionnaireAssessment {
        questionnaireBundles{
          _id
          name
        }
        _id
        status
        answers {
          question
          valid
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
          language
          abbreviation
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

const getFullPublicAssessment = gql`
  query($uuid: String!) {
    getFullPublicAssessment(uuid: $uuid) {
      id
      uuid
      date
      assessmentType {
        id
        name
      }
      status
      createdAt
      updatedAt
      deletedAt
      deliveryDate
      expirationDate
      informantType
      questionnaireAssessment {
        _id
        status
        answers {
          question
          valid
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
          language
          abbreviation
          questionGroups {
            label
            appearance
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
    }
  }
`;

export const AssessmentsQueries = {
  assessments,
  questionnaires,
  getFullAssessment,
  getFullPublicAssessment,
};
