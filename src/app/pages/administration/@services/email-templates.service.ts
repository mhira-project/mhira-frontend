import {Injectable} from '@angular/core';
import {Apollo} from 'apollo-angular';
import {EmailTemplatesQueries} from '../../../@graphql/queries/email-templates'
import {EmailTemplatesMutations} from '../../../@graphql/mutations/email-templates';
import { FetchResult } from 'apollo-link';
import { Observable } from 'rxjs';

@Injectable({providedIn: 'root'})
export class EmailTemplatesService {

    constructor(private apollo : Apollo) {}

    getAllEmailTemplates() {
        return this.apollo.query({query: EmailTemplatesQueries.getAllEmailTemplates})
    }

    createEmailTemplate(emailTemplate : any): Observable < FetchResult < any >> {
        return this.apollo.mutate(
            {
                mutation: EmailTemplatesMutations.createOneEmailTemplate,
                variables: {
                    input: {
                        ...emailTemplate
                    }
                },
                fetchPolicy: 'no-cache'
            }
        );
    }

    updateEmailTemplate(emailTemplate : any): Observable < FetchResult < any >> {
        return this.apollo.mutate(
            {
                mutation: EmailTemplatesMutations.updateOneEmailTemplate,
                variables: {
                    input: {
                        id: emailTemplate.id,
                        name: emailTemplate.name,
                        status: emailTemplate.status,
                        subject: emailTemplate.subject,
                        module: emailTemplate.module,
                        body: emailTemplate.body
                    }
                },
                fetchPolicy: 'no-cache'
            }
        );
    }

    deleteEmailTemplate(id : any): Observable < FetchResult < any >> {
      return this.apollo.mutate(
          {
              mutation: EmailTemplatesMutations.deleteOneEmailTemplate,
              variables: {
                id: id
              },
              fetchPolicy: 'no-cache'
          }
      );
  }
}
