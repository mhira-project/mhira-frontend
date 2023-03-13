import gql from 'graphql-tag';

const getAllEmailTemplates = gql`
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

const getOneEmailTemplate = gql`
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
    getOneEmailTemplate
};
