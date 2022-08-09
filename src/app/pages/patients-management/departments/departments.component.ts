import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Sorting } from '@shared/@types/sorting';
import { finalize } from 'rxjs/operators';
import { SelectModalComponent } from '../../../@shared/components/select-modal/select-modal.component';
import { PageInfo, Paging } from '../../../@shared/@types/paging';
import { Filter } from '../../../@shared/@types/filter';
import { PermissionKey } from '@app/@shared/@types/permission';
import { AppPermissionsService } from '../../../@shared/services/app-permissions.service';
import {
  TableColumn,
  SortField,
  Action,
  ActionArgs,
  DEFAULT_PAGE_SIZE,
} from '../../../@shared/@modules/master-data/@types/list';
import { Department } from '../@types/department';
import { DepartmentsColumns } from '../@tables/departments.table';
import { DepartmentsService } from '../@services/departments.service';
import { FormattedPatient } from '../@types/formatted-patient';
import { ErrorHandlerService } from '../../../@shared/services/error-handler.service';

enum ActionKey {
  REMOVE_DEPARTMENT,
  ADD_DEPARTMENT,
}

@Component({
  selector: 'app-patient-departments',
  templateUrl: './departments.component.html',
  styleUrls: ['./departments.component.scss'],
})
export class DepartmentsComponent implements OnInit {
  PK = PermissionKey;
  ActionKey = ActionKey;

  @Input() public patient: FormattedPatient;

  @Input() public departments: Department[] = [];

  @Output() patientDepartmentsUpdated: EventEmitter<any> = new EventEmitter<any>();

  public columns: TableColumn<Partial<Department>>[] = DepartmentsColumns as TableColumn<Partial<Department>>[];

  public data: Partial<Department>[];

  public pageInfo: PageInfo;

  public departmentRequestOptions: {
    paging: Paging;
    filter: Filter;
    sorting: Sorting[];
  } = {
    paging: { first: DEFAULT_PAGE_SIZE },
    filter: {},
    sorting: [],
  };

  public end = false;

  public loading = false;

  public actions: Action<ActionKey>[] = [];

  constructor(
    private departmentsService: DepartmentsService,
    private modalService: NzModalService,
    private errorService: ErrorHandlerService,
    public perms: AppPermissionsService
  ) {}

  ngOnInit() {
    this.getDepartments();
    if (this.departments.length === 0) {
      this.getDepartments(true);
    }
    this.getDepartments();
    this.setActions();
  }

  public searchDepartments(searchString: string): void {
    this.departmentRequestOptions.filter = {
      or: this.createSearchFilter(searchString),
    };
    this.getDepartments();
  }

  public onPageChange(paging: Paging): void {
    this.departmentRequestOptions.paging = paging;
    this.getDepartments();
  }

  public onSort(sorting: SortField<Department>[]): void {
    this.departmentRequestOptions.sorting = sorting;
    this.getDepartments();
  }

  public onFilter(filter: Filter): void {
    this.departmentRequestOptions.filter = filter;
    this.getDepartments();
  }

  public onAction({ action, context: department }: ActionArgs<Department, ActionKey>): void {
    switch (action.key) {
      case ActionKey.REMOVE_DEPARTMENT:
        this.managePatientDepartments(ActionKey.REMOVE_DEPARTMENT, department);
        return;
    }
  }

  public async updatePatientDepartment(action: ActionKey, selectedDepartment?: Department): Promise<void> {
    const modal = this.modalService.create<SelectModalComponent<Department>>({
      nzTitle: `Add ${this.patient.firstName} ${this.patient.lastName} to department`,
      nzContent: SelectModalComponent,
      nzComponentParams: {
        options: this.departments,
        titleField: 'name',
      },
      nzOnOk: (m) => m.selected,
      nzOnCancel: () => console.log('Cancel'),
    });

    const state: Department = await modal.afterClose.toPromise();

    const departmentId = selectedDepartment ? selectedDepartment.id : state.id;
    const department = selectedDepartment
      ? selectedDepartment
      : this.departments[this.departments.findIndex((p) => p.id === departmentId)];
    this.managePatientDepartments(action, department);
  }

  private getDepartments(getAllDepartments: boolean = false): void {
    this.loading = true;
    const options = { ...this.departmentRequestOptions };

    options.filter = {
      ...options.filter,
      and: [getAllDepartments ? {} : { patients: { id: { eq: this.patient?.id } } }, ...(options.filter.and ?? [])],
    };

    this.departmentsService
      .departments(options)
      .pipe(finalize(() => (this.loading = false)))
      .subscribe((response) => {
        if (getAllDepartments) {
          this.departments = response.data.departments.edges.map((e: any) => e.node);
        } else {
          this.data = response.data.departments.edges.map((e: any) => e.node);
        }
        this.pageInfo = response.data.departments.pageInfo; // TODO: remove
      });
  }

  private createSearchFilter(searchString: string) {
    if (!searchString) return [];
    return [
      { name: { iLike: `%${searchString}%` } },
      { description: { iLike: `%${searchString}%` } },
      {
        patients: {
          or: [
            { firstName: { iLike: `%${searchString}%` } },
            { middleName: { iLike: `%${searchString}%` } },
            { lastName: { iLike: `%${searchString}%` } },
          ],
        },
      },
    ];
  }

  private managePatientDepartments(action: ActionKey, department: Department) {
    this.loading = true;
    const executedAction =
      action === ActionKey.ADD_DEPARTMENT
        ? this.departmentsService.addDepartmentsToPatient(this.patient.id, department.id)
        : this.departmentsService.removeDepartmentsFromPatient(this.patient.id, department.id);
    executedAction.pipe(finalize(() => (this.loading = false))).subscribe(
      () => {
        if (action === ActionKey.ADD_DEPARTMENT) {
          // mutate reference to trigger change detection
          this.data = [department, ...this.data];
        } else {
          const list = [...this.data];
          list.splice(
            list.findIndex((p) => p.id === department.id),
            1
          );
          this.data = list; // mutate reference to trigger change detection
        }
        this.patientDepartmentsUpdated.emit({
          action,
          departments: this.data,
        });
      },
      (error) => this.errorService.handleError(error, { prefix: 'Unable to update department on patient' })
    );
  }

  private setActions(): void {
    if (this.perms.permissionsOnly(PermissionKey.MANAGE_PATIENTS)) {
      this.actions = [
        ...this.actions,
        {
          key: ActionKey.REMOVE_DEPARTMENT,
          title: 'Remove patient from deparment',
        },
      ];
    }
  }
}
