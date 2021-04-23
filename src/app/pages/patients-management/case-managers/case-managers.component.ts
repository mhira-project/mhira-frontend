import { Component, OnInit, Input } from '@angular/core';
import { CaseManagersTable } from '../@tables/case-managers.table';
import { CaseManager } from '@app/pages/patients-management/@types/case-manager';
import { CaseManagersService } from '@app/pages/patients-management/@services/case-managers.service';
import { Paging } from '@shared/@types/paging';
import { CaseManagerModel } from '@app/pages/patients-management/@models/case-manager.model';
import { CaseManagersFilterForm } from '@app/pages/patients-management/@forms/case-managers-filter.form';
import { PatientsService } from '@app/pages/patients-management/@services/patients.service';
import { CaseManagerFilter } from '@app/pages/patients-management/@types/case-manager-filter';
import { UsersService } from '@app/pages/user-management/@services/users.service';
import { Patient } from '@app/pages/patients-management/@types/patient';
import { Subject, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, finalize } from 'rxjs/operators';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { PermissionKey } from '@app/@shared/@types/permission';
import { Permission } from '@app/pages/administration/@types/permission';
import { Department } from '../../administration/@types/department';
import { SelectModalComponent } from '@app/@shared/components/select-modal/select-modal.component';
import { DepartmentsService } from '../@services/departments.service';

@Component({
  selector: 'app-case-managers',
  templateUrl: './case-managers.component.html',
  styleUrls: ['./case-managers.component.scss'],
})
export class CaseManagersComponent implements OnInit {
  public PK = PermissionKey;
  @Input() managerType = 'caseManager';
  @Input() filter: CaseManagerFilter = {};
  @Input() patient: Patient;
  @Input() showAssignButton = false;
  paging: Paging = {
    first: 10,
  };
  pageInfo: any;
  caseManagers: CaseManager[] = [];
  users: CaseManager[] = [];
  caseManagersTable: { columns: any[]; rows: CaseManager[] } = {
    columns: CaseManagersTable.columns,
    rows: [],
  };
  caseManagersFilterForm = CaseManagersFilterForm;
  actions = CaseManagersTable.actions;
  selectedIndex = -1;
  isLoading = false;
  showFilter = false;
  showAssignModal = false;
  showAssignDepartmentModal = false;
  drawerTitle = '';
  caseManagerNiceName = '';

  public searchKeyword = new Subject<string>();
  private searchKeywordSearchSubscription: Subscription;
  manager: CaseManager;

  constructor(
    private caseManagersService: CaseManagersService,
    private patientService: PatientsService,
    private message: NzMessageService,
    private modalService: NzModalService,

    private usersService: UsersService,
    private departmentsService: DepartmentsService
  ) {
    this.searchKeywordSearchSubscription = this.searchKeyword
      .pipe(debounceTime(1000), distinctUntilChanged())
      .subscribe((event: any) => {
        if (event && event.target.value !== '') {
          this.searchCaseManagers(event.target.value);
        }
      });
  }

  ngOnInit(): void {
    this.getCaseManagers();
    this.drawerTitle = this.managerType === 'caseManager' ? 'Filter Case Managers' : 'Filter Informants';
    this.caseManagerNiceName = this.managerType === 'caseManager' ? 'Case Manager' : 'Informant';
  }

  checkIfManagerHasPermission(permissions: Permission[]): boolean {
    return permissions.some((p: Permission) => p.name === this.PK.MANAGE_PATIENTS);
  }

  setCaseManagerServicePropertyName(action: string): string {
    let property =
      action === 'get'
        ? 'getPatientCaseManagers'
        : action === 'assign'
        ? 'assignPatientCaseManager'
        : 'unassignPatientCaseManager';

    switch (this.managerType) {
      case 'caseManager':
        property =
          action === 'get'
            ? 'getPatientCaseManagers'
            : action === 'assign'
            ? 'assignPatientCaseManager'
            : 'unassignPatientCaseManager';
        break;
      case 'informant':
        property =
          action === 'get'
            ? 'getPatientInformants'
            : action === 'assign'
            ? 'assignPatientInformant'
            : 'unassignPatientInformant';
        break;
    }
    return property;
  }

  getCaseManagerServiceProperty(property: any, params?: any) {
    return this.caseManagersService[property](params);
  }

  getCaseManagers() {
    this.isLoading = true;
    this.caseManagers = [];
    this.caseManagersTable.rows = [];
    const query = this.setCaseManagerServicePropertyName('get');
    this.getCaseManagerServiceProperty(query, this.filter).subscribe(
      async ({ data }: any) => {
        data[query].edges.map((caseManager: any) => {
          this.caseManagers.push(CaseManagerModel.fromJson(caseManager.node));
        });
        this.caseManagersTable.rows = this.caseManagers;
        this.paging.after = data[query].pageInfo.endCursor;
        this.paging.before = data[query].pageInfo.startCursor;
        this.pageInfo = data[query].pageInfo;
        this.isLoading = false;
      },
      (error: any) => {
        this.isLoading = false;
      }
    );
  }

  departmentCheck(manager: CaseManager) {
    this.manager = manager;
    if (this.checkPationHasDepartment(manager.departments)) {
    } else {
      this.updatePatientDepartment(manager);
    }
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

    const departmentId = state.id;
    const department = this.manager.departments[this.manager.departments.findIndex((p) => p.id === departmentId)];
    this.managePatientDepartments(manager, department);
  }

  private managePatientDepartments(manager: CaseManager, department: Department) {
    this.isLoading = true;
    const executedAction = this.departmentsService.addDepartmentsToPatient(this.patient.id, department.id);
    executedAction.pipe(finalize(() => (this.isLoading = false))).subscribe(
      () => {
        this.patient.departments.push(department);
        this.assignCaseManager(manager);
      },
      () => this.message.error('An error occurred could not update patient', { nzDuration: 3000 })
    );
  }

  assignCaseManager(manager: CaseManager) {
    this.isLoading = true;
    const query = this.setCaseManagerServicePropertyName('assign');
    this.getCaseManagerServiceProperty(query, { userId: manager.id, patientId: this.patient.id }).subscribe(
      async ({ data }: any) => {
        this.isLoading = false;
        this.showAssignModal = false;
        if (data) {
          this.caseManagersTable.rows = [];
          this.caseManagers.unshift(CaseManagerModel.fromJson(manager));
          this.caseManagersTable.rows = this.caseManagers;
          this.message.create(
            'success',
            `${manager.firstName} has been successfully assigned to ${this.patient.firstName}`
          );
        } else {
          this.message.create('error', `${manager.firstName} could not be assigned to ${this.patient.firstName}`);
        }
      },
      (error: any) => {
        this.isLoading = false;
        this.message.create('error', `${manager.firstName} could not be assigned to ${this.patient.firstName}`);
      }
    );
  }

  unAssignCaseManager(manager: CaseManager) {
    this.isLoading = true;
    const query = this.setCaseManagerServicePropertyName('remove');
    this.getCaseManagerServiceProperty(query, { userId: manager.id, patientId: this.patient.id }).subscribe(
      async ({ data }: any) => {
        this.isLoading = false;
        if (data) {
          const deletedIndex = this.caseManagers.findIndex((_manager) => _manager.id === manager.id);
          this.caseManagers.splice(deletedIndex, 1);
          this.caseManagersTable.rows = this.caseManagers;
          this.message.create(
            'success',
            `${manager.firstName} has been successfully removed from patient ${this.patient.firstName}`
          );
        } else {
          this.message.create('error', `${manager.firstName} could not be removed from ${this.patient.firstName}`);
        }
      },
      (error: any) => {
        this.isLoading = false;
        this.message.create('error', `${this.managerType} could not be assigned to ${this.patient.firstName}`);
      }
    );
  }

  searchPatients(keyword: string) {
    const options: { label: string; value: number }[] = [];
    this.patientService.patients({ filter: { firstName: { iLike: keyword } } }).subscribe(
      async ({ data }) => {
        data.patients.edges.map((patient: any) => {
          const option = { value: patient.node.id, label: `${patient.node.firstName} ${patient.node.lastName}` };
          if (options.indexOf(option) === -1) {
            options.push(option);
          }
        });
        this.caseManagersFilterForm.groups[0].fields[1].options = options;
      },
      (error) => {
        this.isLoading = false;
      }
    );
  }

  searchCaseManagers(keyword: string) {
    this.users = [];
    const options: { label: string; value: number }[] = [];
    this.usersService.getUsers({ filter: { firstName: { iLike: keyword } } }).subscribe(
      async ({ data }) => {
        const users: CaseManager[] = [];
        data.users.edges.map((user: any) => {
          users.push(CaseManagerModel.fromJson(user.node));
          const option = { value: user.node.id, label: `${user.node.firstName} ${user.node.lastName}` };
          if (options.indexOf(option) === -1) {
            options.push(option);
          }
        });
        this.users = users;
        this.caseManagersFilterForm.groups[0].fields[2].options = options;
      },
      (error) => {
        this.isLoading = false;
      }
    );
  }
  checkPationHasDepartment(departments: Department[]): boolean {
    return false;
  }

  navigatePages(direction: string, pageSize: number = 10) {
    switch (direction) {
      case 'next':
        this.paging.before = undefined;
        this.paging.first = pageSize;
        this.paging.last = undefined;
        break;
      case 'previous':
        this.paging.after = undefined;
        this.paging.first = undefined;
        this.paging.last = pageSize;
        break;
    }
    this.getCaseManagers();
  }

  toggleFilterDrawer() {
    this.showFilter = !this.showFilter;
  }

  toggleAssignModal(): void {
    this.showAssignModal = !this.showAssignModal;
  }

  toggleAssignDetapartmentModal(): void {
    this.showAssignDepartmentModal = !this.showAssignDepartmentModal;
  }

  handleSearchOptions(search: any) {
    switch (search.field.name) {
      case 'patientId':
        this.searchPatients(search.keyword);
        break;
      case 'caseManagerId':
        this.searchCaseManagers(search.keyword);
        break;
    }
  }

  handleActionClick(event: any): void {
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
          // nzVisible: this.isOkLoading,
          nzOkDisabled: this.isLoading,
          nzCancelText: 'Cancel',
        });
        break;
    }
  }

  searchManagers(searchString: string) {
    console.log(searchString);
    this.filter.or = [
      { firstName: { iLike: `%${searchString}%` } },
      { middleName: { iLike: `%${searchString}%` } },
      { lastName: { iLike: `%${searchString}%` } },
      { medicalRecordNo: { iLike: `%${searchString}%` } },
    ];
    this.getCaseManagers();
  }

  filterCaseManagers(filter: any) {
    this.filter = filter;
    this.getCaseManagers();
  }
}
