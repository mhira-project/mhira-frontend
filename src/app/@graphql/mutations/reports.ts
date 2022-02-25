import gql from 'graphql-tag';

const createOneReport = gql`
  mutation($input: CreateOneReportInput!) {
    createOneReport(input: $input) {
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

const createManyReports = gql`
  mutation($input: CreateManyReportsInput!) {
    createManyReports(input: $input) {
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

const updateOneReport = gql`
  mutation($input: UpdateOneReportInput!) {
    updateOneReport(input: $input) {
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

const updateManyReports = gql`
  mutation($input: UpdateManyReportsInput!) {
    updateManyReports(input: $input) {
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

const deleteOneReport = gql`
  mutation($input: DeleteOneReportInput!) {
    deleteOneReport(input: $input) {
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

// const addRolesToReport = gql `
//     mutation($input:CreateOneReportRoleInput!) {
//       addRolesToReport(input: $input) {
//         id
//         anonymus
//         name
//         description
//         status
//         repositoryLink
//         appName
//         url
//         resources
//         createdAt
//         updatedAt
//       }
//     }
// `

const addRolesToReport = gql`
  mutation($input: ReportRoleInput!) {
    addRolesToReport(input: $input) {
      id
    }
  }
`;

export const ReportsMutations = {
  createOneReport,
  createManyReports,
  updateOneReport,
  updateManyReports,
  deleteOneReport,
  addRolesToReport,
};
