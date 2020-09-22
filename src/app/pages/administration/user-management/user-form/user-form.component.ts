import { ChangeDetectorRef, Component, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, NavigationStart, Router } from '@angular/router';
import { userForms } from '@app/pages/administration/user-management/form';
import { Form } from '@shared/components/field-generator/formt';
import { TopTabsDataService } from '@shared/services/tabs-data.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
})
export class UserFormComponent implements OnInit {
  user: any;
  mySubscription: any;
  profileFieldsData: any = {};
  profileFields: Form = userForms.userProfile;
  userRolesPermissionsFields: Form = userForms.userRolesPermissions;
  changeUserPasswordFields: Form = userForms.changeUserPassword;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private cd: ChangeDetectorRef,
    private tabsDataService: TopTabsDataService
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

  saveProfile() {
    console.log(this.profileFieldsData);
  }

  onProfileFormChange(data: any) {
    if (data.name && data.value) this.profileFieldsData[data.name] = data.value;
  }
}
