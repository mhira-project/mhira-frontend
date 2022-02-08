import gql from 'graphql-tag';

const createOneCaregiver = gql`
  mutation($input: CreateOneCaregiverInput!) {
    createOneCaregiver(input: $input) {
      id
      #      emergencyContact
      firstName
      middleName
      lastName
      email
      phone
      street
      number
      apartment
      place
      postalCode
      country
      #      relation
      #      note
      #      street
      #      number
      #      apartment
      #      place
      #      postalCode
      #      country
      deletedAt
      createdAt
      updatedAt
    }
  }
`;

const createManyCaregivers = gql`
  mutation($input: CreateManyCaregiversInput!) {
    createManyCaregivers(input: $input) {
      id
      #      emergencyContact
      firstName
      middleName
      lastName
      email
      phone
      street
      number
      apartment
      place
      postalCode
      country
      #      relation
      #      note
      #      street
      #      number
      #      apartment
      #      place
      #      postalCode
      #      country
      deletedAt
      createdAt
      updatedAt
    }
  }
`;

const updateOneCaregiver = gql`
  mutation($input: UpdateOneCaregiverInput!) {
    updateOneCaregiver(input: $input) {
      id
      firstName
      middleName
      lastName
      email
      deletedAt
      street
      number
      apartment
      place
      postalCode
      country
      phone
      #      emergencyContact
      #      firstName
      #      middleName
      #      lastName
      #      email
      #      relation
      #      note
      #      street
      #      number
      #      apartment
      #      place
      #      postalCode
      #      country
      #      createdAt
      #      updatedAt
    }
  }
`;

const updateManyCaregivers = gql`
  mutation($input: UpdateManyCaregiversInput!) {
    updateManyCaregivers(input: $input) {
      id
      #      emergencyContact
      firstName
      middleName
      lastName
      email
      phone
      street
      number
      apartment
      place
      postalCode
      country
      #      relation
      #      note
      #      street
      #      number
      #      apartment
      #      place
      #      postalCode
      #      country
      deletedAt
      createdAt
      updatedAt
    }
  }
`;

const deleteOneCaregiver = gql`
  mutation($input: DeleteOneCaregiverInput!) {
    deleteOneCaregiver(input: $input) {
      id
      #      emergencyContact
      firstName
      middleName
      lastName
      email
      phone
      street
      number
      apartment
      place
      postalCode
      country
      #      relation
      #      note
      #      street
      #      number
      #      apartment
      #      place
      #      postalCode
      #      country
      deletedAt
      createdAt
      updatedAt
    }
  }
`;

const deleteManyCaregivers = gql`
  mutation($input: DeleteManyCaregiversInput!) {
    deleteManyCaregivers(input: $input) {
      deletedCount
    }
  }
`;

const removeCaregiverFromPatient = gql`
  mutation($input: RemoveCaregiverFromPatientInput!) {
    removeCaregiverFromPatient(input: $input) {
      id
      statusId
      medicalRecordNo
      firstName
      middleName
      lastName
      phone
      phone2
      email
      addressStreet
      addressNumber
      addressApartment
      addressPlace
      addressPostalCode
      addressCountryCode
      gender
      birthDate
      birthCountryCode
      nationality
      createdAt
      updatedAt
      caregivers {
        id
        #        emergencyContact
        firstName
        middleName
        lastName
        email
        phone
        street
        number
        apartment
        place
        postalCode
        country
        #        relation
        #        note
        #        street
        #        number
        #        apartment
        #        place
        #        postalCode
        #        country
        deletedAt
        createdAt
        updatedAt
      }
      caseManagers {
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
      status {
        id
        name
        description
        createdAt
        updatedAt
      }
    }
  }
`;

const addCaregiversToPatient = gql`
  mutation($input: AddCaregiversToPatientInput!) {
    addCaregiversToPatient(input: $input) {
      id
      statusId
      medicalRecordNo
      firstName
      middleName
      lastName
      phone
      phone2
      email
      addressStreet
      addressNumber
      addressApartment
      addressPlace
      addressPostalCode
      addressCountryCode
      gender
      birthDate
      birthCountryCode
      nationality
      createdAt
      updatedAt
      caregivers {
        id
        #        emergencyContact
        firstName
        middleName
        lastName
        email
        phone
        street
        number
        apartment
        place
        postalCode
        #        relation
        #        note
        #        street
        #        number
        #        apartment
        #        place
        #        postalCode
        country
        deletedAt
        createdAt
        updatedAt
      }
      caseManagers {
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
      status {
        id
        name
        description
        createdAt
        updatedAt
      }
    }
  }
`;

const deleteCaregiverPatient = gql`
  mutation($input: DeleteOnePatientCaregiverInput!) {
    deleteOnePatientCaregiver(input: $input) {
      id
      patientId
      caregiverId
    }
  }
`;

export const CaregiversMutations = {
  createOneCaregiver,
  createManyCaregivers,
  updateOneCaregiver,
  updateManyCaregivers,
  deleteOneCaregiver,
  deleteManyCaregivers,
  removeCaregiverFromPatient,
  addCaregiversToPatient,
  deleteCaregiverPatient,
};
