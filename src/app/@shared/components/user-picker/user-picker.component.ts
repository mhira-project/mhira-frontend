import { debounceTime, map } from 'rxjs/operators';
import { Component, Output, EventEmitter, ViewChild, OnInit, Input } from '@angular/core';
import { User } from '@app/pages/user-management/@types/user';
import { NzSelectComponent } from 'ng-zorro-antd';
import { UsersService } from '../../../pages/user-management/@services/users.service';
import { UserModel } from '../../../pages/user-management/@models/user.model';

@Component({
  selector: 'app-user-picker',
  templateUrl: './user-picker.component.html',
  styleUrls: ['./user-picker.component.scss'],
})
export class UserPickerComponent implements OnInit {
  @Input()
  public assignSelfOption = false;

  @Output()
  public selectUser = new EventEmitter<User>();

  @Input()
  public readonly = false;

  @Input()
  public set selectedUser(user: User) {
    if (user && !this.users.find((p) => this.compareUsers(p, user))) this.users.push(user);
    this._selectedUser = user;
    this.selectUser.emit(user);
  }
  public get selectedUser(): User {
    return this._selectedUser;
  }

  @ViewChild(NzSelectComponent, { static: true })
  public selectComponent: NzSelectComponent;

  public users: User[] = [];

  private _selectedUser: User;

  constructor(private usersService: UsersService) {}

  public ngOnInit(): void {
    this.selectComponent.nzOnSearch.pipe(debounceTime(300)).subscribe((q) => this.onSearch(q));
  }

  public onAssignSelf(): void {
    const user = JSON.parse(localStorage.getItem('user')) as User;
    if (!this.users.find((u) => u.id === user.id)) this.users.push(user);
    this.selectedUser = user;
  }

  public onSearch(q: string) {
    if (!q) {
      this.users = [];
      return;
    }

    const filter = { or: this.createSearchFilter(q) };
    this.usersService
      .getUsers({ filter })
      .pipe(map(({ data }) => (data?.users?.edges ?? []).map((user: any) => UserModel.fromJson(user.node))))
      .subscribe((users) => (this.users = users));
  }

  public compareUsers(userA: User, userB: User): boolean {
    return userA?.id && userB?.id && userA?.id === userB?.id;
  }

  private createSearchFilter(searchString: string) {
    if (!searchString) return [];
    return [
      { firstName: { iLike: `%${searchString}%` } },
      { middleName: { iLike: `%${searchString}%` } },
      { lastName: { iLike: `%${searchString}%` } },
      { workID: { iLike: `%${searchString}%` } },
      { phone: { iLike: `%${searchString}%` } },
      { username: { iLike: `%${searchString}%` } },
    ];
  }
}
