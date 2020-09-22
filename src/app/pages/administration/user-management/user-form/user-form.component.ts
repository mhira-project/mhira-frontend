import { ChangeDetectorRef, Component, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, NavigationStart, Router } from '@angular/router';
import { userForms } from '@app/pages/administration/user-management/@forms/form';
import { Form } from '@shared/components/field-generator/formt';
import { TopTabsDataService } from '@shared/services/tabs-data.service';
import * as moment from 'moment';
import { User } from '@app/pages/administration/administration.interfaces';
import { UserService } from '@app/pages/administration/@services/user.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { TabInterface } from '@app/@layout/vertical/header/tabs/tab.interface';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
})
export class UserFormComponent implements OnInit {
  user: User;
  isLoading = false;
  loadingMessage = '';
  profileFields: Form = userForms.userProfile;
  userRolesPermissionsFields: Form = userForms.userRolesPermissions;
  changeUserPasswordFields: Form = userForms.changeUserPassword;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private cd: ChangeDetectorRef,
    private tabsDataService: TopTabsDataService,
    private usersService: UserService,
    private message: NzMessageService
  ) {}

  ngOnInit(): void {
    this.onChangeUser();
  }

  onChangeUser() {
    this.tabsDataService.selectedIndex.subscribe((index) => {
      if (index !== -1) {
        this.tabsDataService.tabs.subscribe((tabs) => {
          if (!tabs[index].title) tabs[index].title = 'New User';
        });
      }
    });
  }
  updateTab(user: User) {
    this.tabsDataService.selectedIndex.subscribe((index) => {
      if (index !== -1) {
        this.tabsDataService.tabs.subscribe((tabs) => {
          if (!tabs[index].title) {
            tabs[index].title = `${user.firstName} ${user.lastName}`;
            tabs[index].path = `${tabs[index].path}?user=${JSON.stringify(user)}`;
          }
        });
      }
    });
  }
  createUser(user: User) {
    this.isLoading = true;
    this.loadingMessage = `Creating user ${user.firstName} ${user.lastName}`;
    this.usersService.createUser(user).subscribe(
      async ({ data }) => {
        const userData = data['createUser'];
        userData.updatedAt = userData.updatedAt ? moment(userData.updatedAt).format('DD-MM-YYYY HH:mm') : '';
        userData.birthDate = userData.birthDate ? moment(userData.birthDate).format('DD-MM-YYYY HH:mm') : '';
        this.isLoading = false;
        this.loadingMessage = '';
        //close this tab
        this.user = userData;
        //open another
        this.updateTab(userData);
      },
      (error) => {
        this.isLoading = false;
        this.loadingMessage = '';
      }
    );
  }

  updateUser(user: User) {
    this.isLoading = true;
    this.loadingMessage = `Updating user ${user.firstName} ${user.lastName}`;
    this.usersService.updateUser(user).subscribe(
      async ({ data }) => {
        const userData = data['updateUser'];
        const color = userData.active
          ? 'ng-trigger ng-trigger-fadeMotion ant-tag-green ant-tag'
          : 'ng-trigger ng-trigger-fadeMotion ant-tag-red ant-tag';

        const active = userData.active ? 'active' : 'inactive';

        userData.updatedAt = userData.updatedAt ? moment(userData.updatedAt).format('DD-MM-YYYY HH:mm') : '';
        userData.birthDate = userData.birthDate ? moment(userData.birthDate).format('DD-MM-YYYY HH:mm') : '';
        userData.active = `<nz-tag class="${color}">${active}</nz-tag>`;

        // const updatedIndex = this.users.findIndex((_user) => _user.id === user.id);

        this.isLoading = false;
        this.loadingMessage = '';
        this.message.create('success', `User has successfully been created`);
      },
      (error) => {
        this.isLoading = false;
        this.loadingMessage = '';
      }
    );
  }
  submitForm(form: any): void {
    if (form.id) {
      this.updateUser(form);
    } else {
      this.createUser(form);
    }
  }
}
