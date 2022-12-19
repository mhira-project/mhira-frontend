import gql from 'graphql-tag';

const getAllEmailTemplates = gql` {
    getAllEmailTemplates {
        edges {
            node {
                id
                name
                status
                subject
                module
                body
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

export const EmailTemplatesQueries = {
    getAllEmailTemplates
};
