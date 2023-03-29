import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';
import { FetchResult } from 'apollo-link';
import { Filter } from '@shared/@types/filter';
import { Sorting } from '@shared/@types/sorting';
import { Paging } from '@shared/@types/paging';
import { EmergencyContactsQueries } from '../../../@graphql/queries/contacts';
import { Contact, UpdateOneEmergencyContactInput } from '@app/pages/patients-management/@types/contact';
import { EmergencyContactsMutations } from '@app/@graphql/mutations/contacts';

@Injectable({
  providedIn: 'root',
})
export class EmergencyContactsService {
  constructor(private apollo: Apollo) {}

  emergencyContacts(params?: { paging?: Paging; filter?: Filter; sorting?: Sorting[] }): Observable<FetchResult<any>> {
    return this.apollo.query({
      query: EmergencyContactsQueries.emergencyContacts,
      variables: {
        paging: params && params.paging ? params.paging : undefined,
        filter: params && params.filter ? params.filter : undefined,
        sorting: params && params.sorting ? params.sorting : undefined,
      },
      fetchPolicy: 'no-cache',
    });
  }

  createEmergencyContact(emergencyContact: Contact): Observable<FetchResult<any>> {
    return this.apollo.mutate({
      mutation: EmergencyContactsMutations.createOneEmergencyContact,
      variables: {
        input: { emergencyContact },
      },
      fetchPolicy: 'no-cache',
    });
  }

  createManyEmergencyContacts(emergencyContacts: Contact[]): Observable<FetchResult<any>> {
    return this.apollo.mutate({
      mutation: EmergencyContactsMutations.createManyEmergencyContacts,
      variables: {
        input: { emergencyContacts },
      },
      fetchPolicy: 'no-cache',
    });
  }

  updateEmergencyContact(emergencyContact: UpdateOneEmergencyContactInput): Observable<FetchResult<any>> {
    return this.apollo.mutate({
      mutation: EmergencyContactsMutations.updateOneEmergencyContact,
      variables: {
        input: { emergencyContact },
      },
      fetchPolicy: 'no-cache',
    });
  }

  addEmergencyContactsToPatient(patientId: number, contactsIds: number[]): Observable<FetchResult<any>> {
    return this.apollo.mutate({
      mutation: EmergencyContactsMutations.addEmergencyContactsToPatient,
      variables: {
        input: {
          id: patientId,
          relationIds: contactsIds,
        },
      },
      fetchPolicy: 'no-cache',
    });
  }

  removeEmergencyContactsFromPatient(patientId: number, contactsIds: number[]): Observable<FetchResult<any>> {
    return this.apollo.mutate({
      mutation: EmergencyContactsMutations.removeEmergencyContactsFromPatient,
      variables: {
        input: {
          id: patientId,
          relationIds: contactsIds,
        },
      },
      fetchPolicy: 'no-cache',
    });
  }

  deleteEmergencyContact(emergencyContact: Contact): Observable<FetchResult<any>> {
    return this.apollo.mutate({
      mutation: EmergencyContactsMutations.deleteOneEmergencyContact,
      variables: {
        input: { id: emergencyContact.id },
      },
      fetchPolicy: 'no-cache',
    });
  }
}
