import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';
import { FetchResult } from 'apollo-link';
import { UsersMutations } from '../../../@graphql/mutations/users';
import { UsersQueries } from '../../../@graphql/queries/users';
import { User } from '../administration.interfaces';
import {
  UserChangePasswordInput,
  UserUpdatePasswordInput,
} from '../user-management/user-form/user-update-password.type';
import { Paging } from '@shared/@types/paging';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private apollo: Apollo) {}

  getUsers(filter: any, paging: Paging): Observable<FetchResult<any>> {
    return this.apollo.query({
      query: UsersQueries.getUsers,
      variables: { filter, paging },
      fetchPolicy: 'no-cache',
    });
  }

  createUser(user: User): Observable<FetchResult<any>> {
    return this.apollo.mutate({
      mutation: UsersMutations.createUser,
      variables: user,
      fetchPolicy: 'no-cache',
    });
  }

  updateUser(user: User): Observable<FetchResult<any>> {
    return this.apollo.mutate({
      mutation: UsersMutations.updateUser,
      variables: user,
      fetchPolicy: 'no-cache',
    });
  }
  changeUserPassword(inputs: UserChangePasswordInput): Observable<FetchResult<any>> {
    return this.apollo.mutate({
      mutation: UsersMutations.changeUserPassword,
      variables: inputs,
      fetchPolicy: 'no-cache',
    });
  }
  updateUserPassword(inputs: UserUpdatePasswordInput): Observable<FetchResult<any>> {
    return this.apollo.mutate({
      mutation: UsersMutations.updateUserPassword,
      variables: inputs,
      fetchPolicy: 'no-cache',
    });
  }
  deleteUser(user: User): Observable<FetchResult<any>> {
    return this.apollo.mutate({
      mutation: UsersMutations.deleteUser,
      variables: { id: user.id },
      fetchPolicy: 'no-cache',
    });
  }
  softDeleteUser(user: User): Observable<FetchResult<any>> {
    return this.apollo.mutate({
      mutation: UsersMutations.softDeleteUser,
      variables: { id: user.id },
      fetchPolicy: 'no-cache',
    });
  }
}
