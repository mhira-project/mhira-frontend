import gql from 'graphql-tag';

const getAllEmailTemplates = gql `
 query($paging: CursorPaging, $filter: MailTemplateFilter) {
    getAllEmailTemplates(paging: $paging, filter: $filter) {
        edges {
            node {
                id
                name
                status
                subject
                module
                body
                isPublic
                departments{
                    id
                }
            }
        }
        pageInfo{
            hasNextPage
            hasPreviousPage
            startCursor
            endCursor
        }
    }
}
`;

const getPatientEmailTemplates = gql `
query($patientId: ID) {
    getPatientEmailTemplates(patientId: $patientId) {
        id
        name
        subject
        body
        status
        module
        createdAt
        updatedAt
        deletedAt
        isPublic
        departments{
            id
        }
    }
}`;

const getOneEmailTemplate = gql `
 query($id: ID!) {
    getEmailTemplate(id: $id) {
        id
        name
        status
        subject
        module
        body
        isPublic
        departments{
            id
        }
    }
}
`;

export const EmailTemplatesQueries = {
    getAllEmailTemplates,
    getOneEmailTemplate,
    getPatientEmailTemplates
};
