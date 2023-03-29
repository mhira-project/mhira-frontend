import gql from 'graphql-tag';

const createOneEmailTemplate = gql `
  mutation($input: CreateEmailTemplate!) {
    createEmailTemplate(input: $input) {
      id
      name
      subject
      body
      status
      module
      isPublic
      departments{
        id
      }
    }
  }
`;

const updateOneEmailTemplate = gql `
  mutation($input: UpdateEmailTemplate!) {
    updateEmailTemplate(input: $input) {
      id
      name
      subject
      body
      status
      module
      isPublic
      departments{
        id
      }
    }
  }
`;

const deleteOneEmailTemplate = gql `
  mutation($id: Float!) {
    deleteEmailTemplate(id: $id)
  }
`;

export const EmailTemplatesMutations = {
    createOneEmailTemplate,
    updateOneEmailTemplate,
    deleteOneEmailTemplate
};
