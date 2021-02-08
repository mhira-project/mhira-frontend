import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';
import { FetchResult } from 'apollo-link';
import { UsersMutations } from '../../../@graphql/mutations/users';
import { UsersQueries } from '../../../@graphql/queries/users';
import { CreateOneUserInput, UpdateOneUserInput, User } from '../@types/user';
import { UserChangePasswordInput, UserUpdatePasswordInput } from '../user-form/user-update-password.type';
import { Paging } from '@shared/@types/paging';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private apollo: Apollo) {}

  getUsers(filter?: any, paging?: Paging): Observable<FetchResult<any>> {
    return this.apollo.query({
      query: UsersQueries.getUsers,
      variables: { filter, paging },
      fetchPolicy: 'no-cache',
    });
  }

  createUser(createOneUserInput: CreateOneUserInput): Observable<FetchResult<any>> {
    return this.apollo.mutate({
      mutation: UsersMutations.createOneUser,
      variables: { createOneUserInput },
      fetchPolicy: 'no-cache',
    });
  }

  updateUser(updateOneUserInput: UpdateOneUserInput): Observable<FetchResult<any>> {
    return this.apollo.mutate({
      mutation: UsersMutations.updateOneUser,
      variables: { updateOneUserInput },
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
