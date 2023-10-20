import {Injectable} from '@angular/core';
import {Apollo} from 'apollo-angular';
import {EmailTemplatesQueries} from '../../../@graphql/queries/email-templates'
import {EmailTemplatesMutations} from '../../../@graphql/mutations/email-templates';
import { FetchResult } from 'apollo-link';
import { Observable } from 'rxjs';
import { Filter } from '@app/@shared/@types/filter';
import { Paging } from '@app/@shared/@types/paging';
import { Sorting } from '@app/@shared/@types/sorting';

@Injectable({providedIn: 'root'})
export class EmailTemplatesService {

    constructor(private apollo : Apollo) {}

    getAllEmailTemplates(
        params?: {
            paging?: Paging;
            filter?: Filter;
            sorting?: Sorting[];
        }
    ): Observable<FetchResult<any>>
    {
        return this.apollo.query({
            query: EmailTemplatesQueries.getAllEmailTemplates,
            variables: {
                paging: params && params.paging ? params.paging : undefined,
                filter: params && params.filter ? params.filter : undefined,
                sorting: params && params.sorting ? params.sorting : undefined,
            },
            fetchPolicy: 'no-cache',
        })
    }

    getPatientEmailTemplates(patientId: any): Observable<FetchResult<any>>{
        return this.apollo.query({
            query: EmailTemplatesQueries.getPatientEmailTemplates,
            variables: {
                patientId,
            },
            fetchPolicy: 'no-cache',
        })
    }

    getOneEmailTemplate(id: any): Observable<FetchResult<any>> {
        return this.apollo.query({
          query: EmailTemplatesQueries.getOneEmailTemplate,
          variables: {
            id,
          },
          fetchPolicy: 'no-cache'
        });
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
                        body: emailTemplate.body,
                        isPublic: emailTemplate.isPublic,
                        departmentIds: emailTemplate.departmentIds
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
                id
              },
              fetchPolicy: 'no-cache'
          }
      );
    }
}
