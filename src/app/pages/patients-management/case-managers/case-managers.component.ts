import { Component, OnInit, Input } from '@angular/core';
import { CaseManagerColumns } from '../@tables/case-managers.table';
import { CaseManager } from '@app/pages/patients-management/@types/case-manager';
import { CaseManagersService } from '@app/pages/patients-management/@services/case-managers.service';
import { PageInfo, Paging } from '@shared/@types/paging';
import { CaseManagerModel } from '@app/pages/patients-management/@models/case-manager.model';
import { CaseManagersFilterForm } from '@app/pages/patients-management/@forms/case-managers-filter.form';
import { PatientsService } from '@app/pages/patients-management/@services/patients.service';
import { CaseManagerFilter } from '@app/pages/patients-management/@types/case-manager-filter';
import { UsersService } from '@app/pages/user-management/@services/users.service';
import { Patient } from '@app/pages/patients-management/@types/patient';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Subject } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { PermissionKey } from '@app/@shared/@types/permission';
import { Permission } from '@app/pages/administration/@types/permission';
import { Department } from '../../administration/@types/department';
import { SelectModalComponent } from '@app/@shared/components/select-modal/select-modal.component';
import { DepartmentsService } from '../@services/departments.service';
import { Filter } from '@app/@shared/@types/filter';
import { Sorting } from '@app/@shared/@types/sorting';
import {
  Action,
  ActionArgs,
  DEFAULT_PAGE_SIZE,
  SortField,
  TableColumn,
} from '@app/@shared/@modules/master-data/@types/list';
import { FormattedUser } from '@app/pages/user-management/@types/formatted-user';
import { AppPermissionsService } from '@app/@shared/services/app-permissions.service';
import { ErrorHandlerService } from '@app/@shared/services/error-handler.service';
enum ActionKey {
  UNASSIGN_CASEMANAGER,
}

@Component({
  selector: 'app-case-managers',
  templateUrl: './case-managers.component.html',
  styleUrls: ['./case-managers.component.scss'],
})
export class CaseManagersComponent implements OnInit {
  public PK = PermissionKey;

  public data: Partial<FormattedUser>[];

  public columns: TableColumn<FormattedUser>[] = CaseManagerColumns;

  public caseManagersRequestOptions: {
    paging: Paging;
    filter: Filter;
    sorting: Sorting[];
  } = {
    paging: { first: DEFAULT_PAGE_SIZE },
    filter: {},
    sorting: [],
  };

  public loading = false;

  public pageInfo: PageInfo;

  public actions: Action<ActionKey>[] = [];

  @Input() managerType = 'caseManager';
  @Input() filter: CaseManagerFilter = {};
  @Input() patient: Patient;
  @Input() patientDepartments: Department[];
  @Input() showAssignButton = false;
  paging: Paging = {
    first: 10,
  };
  caseManagers: CaseManager[] = [];
  users: CaseManager[] = [];
  caseManagerFilter: CaseManagerFilter;
  caseManagersFilterForm = CaseManagersFilterForm;
  selectedIndex = -1;
  showFilter = false;
  showAssignModal = false;
  showAssignDepartmentModal = false;
  drawerTitle = '';
  caseManagerNiceName = '';
  manager: CaseManager = null;
  public departmentRequestOptions: {
    paging: Paging;
    filter: CaseManagerFilter;
    sorting: Sorting[];
  } = {
    paging: { first: DEFAULT_PAGE_SIZE },
    filter: {},
    sorting: [],
  };

  public userRequestOptions: {
    paging: Paging;
    filter: Filter;
    sorting: Sorting[];
  } = {
    paging: { first: DEFAULT_PAGE_SIZE },
    filter: {},
    sorting: [],
  };

  public searchKeyword = new Subject<string>();

  constructor(
    private caseManagersService: CaseManagersService,
    private patientService: PatientsService,
    public perms: AppPermissionsService,
    private message: NzMessageService,
    private modalService: NzModalService,
    private errorService: ErrorHandlerService,
    private usersService: UsersService,
    private departmentsService: DepartmentsService
  ) {}

  ngOnInit(): void {
    this.caseManagersRequestOptions.filter = this.filter;
    this.getCaseManagers();
    this.drawerTitle = this.managerType === 'caseManager' ? 'Filter Case Managers' : 'Filter Informants';
    this.caseManagerNiceName = this.managerType === 'caseManager' ? 'Case Manager' : 'Informant';
    this.getDepartments();
    if (this.perms.permissionsOnly(PermissionKey.MANAGE_PATIENTS)) {
      this.actions = [{ key: ActionKey.UNASSIGN_CASEMANAGER, title: 'Unasign casemanager' }];
    }
  }

  public onPageChange(paging: Paging): void {
    this.caseManagersRequestOptions.paging = paging;
    this.getCaseManagers();
  }

  public onSort(sorting: SortField<FormattedUser>[]): void {
    this.caseManagersRequestOptions.sorting = sorting;
    this.getCaseManagers();
  }

  public onFilter(filter: Filter): void {
    this.caseManagersRequestOptions.filter = filter;
    this.getCaseManagers();
  }

  public onSearch(searchString: string): void {
    this.caseManagersRequestOptions.filter = {
      or: this.createSearchFilter(searchString),
    };
    this.getCaseManagers();
  }

  public checkIfManagerHasPermission(permissions: Permission[]): boolean {
    return permissions.some((p: Permission) => p.name === this.PK.MANAGE_PATIENTS);
  }

  public getCaseManagerServiceProperty(property: any, params?: any) {
    return this.caseManagersService[property](params);
  }

  public async updatePatientDepartment(manager: CaseManager): Promise<void> {
    const modal = this.modalService.create<SelectModalComponent<Department>>({
      nzTitle: `Add ${this.patient.firstName} ${this.patient.lastName} to department`,
      nzContent: SelectModalComponent,
      nzComponentParams: {
        options: this.manager.departments,
        titleField: 'name',
      },
      nzOnOk: (m) => m.selected,
    });

    const state: Department = await modal.afterClose.toPromise();
    if (state) {
      const departmentId = state.id;
      const department = this.manager.departments[this.manager.departments.findIndex((p) => p.id === departmentId)];
      this.checkPationHasDepartment(department)
        ? this.assignCaseManager(manager)
        : this.managePatientDepartments(manager, department);
    }
  }

  public departmentCheck(manager: CaseManager) {
    this.manager = manager;

    // check if there is at least 1 of the same department
    if (manager.departments.some((md) => this.patient.departments.find((pd) => pd.id === md.id))) {
      this.assignCaseManager(manager);
    } else {
      this.updatePatientDepartment(manager);
    }
  }

  public toggleFilterDrawer() {
    this.showFilter = !this.showFilter;
  }

  public toggleAssignModal(): void {
    this.showAssignModal = !this.showAssignModal;
  }

  public toggleAssignDetapartmentModal(): void {
    this.showAssignDepartmentModal = !this.showAssignDepartmentModal;
  }

  public handleSearchOptions(search: { field: { name: string }; keyword: string }) {
    switch (search.field.name) {
      case 'patientId':
        this.searchPatients(search.keyword);
        break;
      case 'caseManagerId':
        this.searchCaseManagers(search.keyword);
        break;
    }
  }
  public onAction({ action, context: casemanager }: ActionArgs<CaseManager, ActionKey>): void {
    switch (action.key) {
      case ActionKey.UNASSIGN_CASEMANAGER:
        this.unAssignCaseManager(casemanager);
        return;
    }
  }

  public handleActionClick(event: { index: number; action: { name: string } }): void {
    this.selectedIndex = event.index;
    switch (event.action.name) {
      case 'Remove':
        this.modalService.confirm({
          nzTitle: 'Confirm',
          nzContent: `Are you sure you want to remove ${this.caseManagers[this.selectedIndex].firstName} ${
            this.caseManagers[this.selectedIndex].lastName
          }`,
          nzOkText: 'Remove',
          nzOnOk: () => this.unAssignCaseManager(this.caseManagers[this.selectedIndex]),
          nzOkDisabled: this.loading,
          nzCancelText: 'Cancel',
        });
        break;
    }
  }

  public searchManagers(searchString: string) {
    this.filter.or = this.createSearchFilter(searchString);
    this.getCaseManagers();
  }

  public filterCaseManagers(filter: CaseManagerFilter) {
    this.filter = filter;
    this.getCaseManagers();
  }
  public searchCaseManagers(searchString: string): void {
    this.userRequestOptions.filter = {
      or: this.createSearchFilter(searchString),
    };
    this.getSearchedCaseManagers();
  }

  private createSearchFilter(searchString: string): Array<{ [K in keyof FormattedUser]: {} }> {
    if (!searchString) return [];
    return [
      { firstName: { iLike: `%${searchString}%` } },
      { middleName: { iLike: `%${searchString}%` } },
      { lastName: { iLike: `%${searchString}%` } },
      { workID: { iLike: `%${searchString}%` } },
      { phone: { iLike: `%${searchString}%` } },
      { username: { iLike: `%${searchString}%` } },
      {
        roles: {
          or: [{ name: { iLike: `%${searchString}%` } }],
        },
      },
      {
        departments: {
          or: [{ name: { iLike: `%${searchString}%` } }],
        },
      },
    ];
  }

  private getCaseManagers(): void {
    this.loading = true;
    const options = { ...this.caseManagersRequestOptions };
    const patientFilter = this.patient ? { patients: { id: { eq: this.patient.id } } } : undefined;
    const previousAndFilters = options.filter ? options.filter.and ?? [] : [];
    options.filter = {
      ...options.filter,
      and: [patientFilter, ...previousAndFilters],
    };
    this.caseManagersService
      .getPatientCaseManagers({
        patientId: this.patient ? this.patient?.id : -1,
      })
      .pipe(finalize(() => (this.loading = false)))
      .subscribe(({ data }) => {
        this.data = data.getPatientCaseManagers.edges.map((caseManager: any) =>
          CaseManagerModel.fromJson(caseManager.node)
        );
        this.pageInfo = data.getPatientCaseManagers.pageInfo;
      });
  }

  private getDepartments(): void {
    this.loading = true;
    const options = { ...this.departmentRequestOptions };
    options.filter = {
      and: [{ patients: { id: { eq: this.patient?.id } } }, ...(options.filter.and ?? [])],
    };
    this.departmentsService
      .departments(options)
      .pipe(finalize(() => (this.loading = false)))
      .subscribe((response) => {
        if (this.patient) {
          this.patient.departments = response.data.departments.edges.map((e: any) => e.node);
        }
      });
  }

  private managePatientDepartments(manager: CaseManager, department: Department) {
    this.loading = true;
    const executedAction = this.departmentsService.addDepartmentsToPatient(this.patient.id, department.id);
    executedAction.pipe(finalize(() => (this.loading = false))).subscribe(
      () => {
        this.patient.departments.push(department);
        this.assignCaseManager(manager);
      },
      (error) =>
        this.errorService.handleError(error, {
          prefix: 'An error occurred could not update patient',
        })
    );
  }

  private assignCaseManager(manager: CaseManager) {
    this.loading = true;
    this.caseManagersService
      .assignPatientCaseManager({
        userId: manager.id,
        patientId: this.patient.id,
      })
      .pipe(finalize(() => (this.loading = false)))
      .subscribe(
        () => {
          // modify reference to trigger change detection
          this.data = [CaseManagerModel.fromJson(manager), ...this.data];
          this.message.create(
            'success',
            `${manager.firstName} has been successfully assigned to ${this.patient.firstName}`
          );
        },
        (error) =>
          this.errorService.handleError(error, {
            prefix: `${manager.firstName} could not be assigned to ${this.patient.firstName}`,
          })
      );
  }

  private async unAssignCaseManager(manager: CaseManager) {
    const modal = this.modalService.confirm({
      nzOnOk: () => true,
      nzTitle: 'Unassign Case manager',
      nzContent: `
        Are you sure you want to unassign case manager ${manager.firstName} ${manager.lastName}? This action is irreversible
      `,
    });

    const confirmation = await modal.afterClose.toPromise();
    if (!confirmation) return;

    this.loading = true;
    this.caseManagersService
      .unassignPatientCaseManager({
        userId: manager.id,
        patientId: this.patient.id,
      })
      .pipe(finalize(() => (this.loading = false)))
      .subscribe(
        () => {
          // modify reference to trigger change detection
          const list = [...this.data];
          list.splice(list.indexOf(manager), 1);
          this.data = list;
        },
        (error) =>
          this.errorService.handleError(error, {
            prefix: 'Unable to remove case manager',
          })
      );
  }

  private searchPatients(keyword: string) {
    const options: { label: string; value: number }[] = [];
    this.patientService.patients({ filter: { firstName: { iLike: keyword } } }).subscribe(
      async ({ data }) => {
        data.patients.edges.map((patient: any) => {
          const option = {
            value: patient.node.id,
            label: `${patient.node.firstName} ${patient.node.lastName}`,
          };
          if (options.indexOf(option) === -1) {
            options.push(option);
          }
        });
        this.caseManagersFilterForm.groups[0].fields[1].options = options;
      },
      () => {
        this.loading = false;
      }
    );
  }

  private getSearchedCaseManagers(): void {
    this.loading = true;
    this.usersService
      .getUsers(this.userRequestOptions)
      .pipe(finalize(() => (this.loading = false)))
      .subscribe(({ data }) => {
        this.users = data.users.edges.map((caseManager: any) => CaseManagerModel.fromJson(caseManager.node));
        this.caseManagersFilterForm.groups[0].fields[2].options = this.users.map((user) => {
          return {
            value: user.id,
            label: `${user.firstName} ${user.lastName}`,
          };
        });
      });
  }

  private checkPationHasDepartment(department: Department): boolean {
    return this.patient?.departments.some((r) => r.id === department.id);
  }
}
