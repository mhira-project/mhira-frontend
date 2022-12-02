import gql from 'graphql-tag';

const createOneRole = gql`
  mutation($input: CreateOneRoleInput!) {
    createOneRole(input: $input) {
      id
      name
      isSuperAdmin
      hierarchy
      createdAt
      updatedAt
    }
  }
`;

const createManyRoles = gql`
  mutation($input: CreateManyRolesInput!) {
    createManyRoles(input: $input) {
      id
      name
      isSuperAdmin
      hierarchy
      createdAt
      updatedAt
    }
  }
`;

const updateOneRole = gql`
  mutation($input: UpdateOneRoleInput!) {
    updateOneRole(input: $input) {
      id
      name
      isSuperAdmin
      hierarchy
      createdAt
      updatedAt
    }
  }
`;

const updateManyRoles = gql`
  mutation($input: UpdateManyRolesInput!) {
    updateManyRoles(input: $input) {
      id
      name
      isSuperAdmin
      hierarchy
      createdAt
      updatedAt
    }
  }
`;

const deleteOneRole = gql`
  mutation($input: DeleteOneRoleInput!) {
    deleteOneRole(input: $input) {
      id
      name
      isSuperAdmin
      hierarchy
      createdAt
      updatedAt
    }
  }
`;

const deleteManyRoles = gql`
  mutation($input: DeleteManyRolesInput!) {
    deleteManyRoles(input: $input) {
      deletedCount
    }
  }
`;

const setRolesOnUser = gql`
  mutation($input: SetRolesOnUserInput!) {
    setRolesOnUser(input: $input) {
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
  }
`;

const removeUsersFromRole = gql`
  mutation($input: RemoveUsersFromRoleInput!) {
    removeUsersFromRole(input: $input) {
      id
      name
      hierarchy
      createdAt
      updatedAt
      users {
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
    }
  }
`;

const removePermissionsFromRole = gql`
  mutation($input: RemovePermissionsFromRoleInput!) {
    removePermissionsFromRole(input: $input) {
      id
      name
      hierarchy
      createdAt
      updatedAt
      users {
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
    }
  }
`;

const setUsersOnRole = gql`
  mutation($input: SetUsersOnRoleInput!) {
    setUsersOnRole(input: $input) {
      id
      name
      hierarchy
      createdAt
      updatedAt
      users {
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
    }
  }
`;

const addPermissionsToRole = gql`
  mutation($input: AddPermissionsToRoleInput!) {
    addPermissionsToRole(input: $input) {
      id
      name
      hierarchy
      createdAt
      updatedAt
      users {
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
    }
  }
`;

const addUsersToRole = gql`
  mutation($input: AddUsersToRoleInput!) {
    addUsersToRole(input: $input) {
      id
      name
      hierarchy
      createdAt
      updatedAt
      users {
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
    }
  }
`;

const addRolesToUser = gql`
  mutation($input: AddRolesToUserInput!) {
    addRolesToUser(input: $input) {
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
  }
`;

const removeRolesFromUser = gql`
  mutation($input: RemoveRolesFromUserInput!) {
    removeRolesFromUser(input: $input) {
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
  }
`;

const addDepartmentsToUser = gql`
  mutation($input: AddDepartmentsToUserInput!) {
    addDepartmentsToUser(input: $input) {
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
  }
`;

const removeDepartmentsFromUser = gql`
  mutation($input: RemoveDepartmentsFromUserInput!) {
    removeDepartmentsFromUser(input: $input) {
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
  }
`;

const addRolesToReport = gql`
  mutation($input: AddRolesToReportInput!) {
    addRolesToReport(input: $input) {
      id
      anonymus
      name
      description
      status
      repositoryLink
      appName
      url
      resources
      createdAt
      updatedAt
    }
  }
`;

const removeRolesFromReport = gql`
  mutation($input: RemoveRolesFromReportInput!) {
    removeRolesFromReport(input: $input) {
      id
      anonymus
      name
      description
      status
      repositoryLink
      appName
      url
      resources
      createdAt
      updatedAt
    }
  }
`;

export const RolesMutations = {
  createOneRole,
  createManyRoles,
  updateOneRole,
  updateManyRoles,
  deleteOneRole,
  deleteManyRoles,
  setRolesOnUser,
  removeUsersFromRole,
  removePermissionsFromRole,
  setUsersOnRole,
  addPermissionsToRole,
  addUsersToRole,
  addRolesToUser,
  addDepartmentsToUser,
  removeRolesFromUser,
  removeDepartmentsFromUser,
  addRolesToReport,
  removeRolesFromReport,
};
