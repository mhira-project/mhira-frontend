import { Component, Input } from '@angular/core';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
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

enum ActionKey {
  REMOVE_DEPARTMENT,
}

@Component({
  selector: 'app-patient-departments',
  templateUrl: './departments.component.html',
  styleUrls: ['./departments.component.scss'],
})
export class DepartmentsComponent {
  PK = PermissionKey;

  @Input() public patient: FormattedPatient;

  public columns: TableColumn<Partial<Department>>[] = DepartmentsColumns as TableColumn<Partial<Department>>[];

  public data: Partial<Department>[];

  public departments: Department[] = [];

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
    private messageService: NzMessageService,
    public perms: AppPermissionsService
  ) {
    this.getDepartments();
    this.getDepartments(true);
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
        this.managePatientDepartments('removePatientFromDepartment', department.id, department);
        return;
    }
  }

  private getDepartments(getAllDepartments = false): void {
    this.loading = true;
    const options = { ...this.departmentRequestOptions };

    options.filter = {
      ...options.filter,
      and: [
        // getAllDepartments ? {} : { patients: { id: { eq: this.patient.id } } },
        ...(options.filter.and ?? []),
      ],
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
      // {
      //   patients: {
      //     or: [
      //       { firstName: { iLike: `%${searchString}%` } },
      //       { middleName: { iLike: `%${searchString}%` } },
      //       { lastName: { iLike: `%${searchString}%` } },
      //     ],
      //   },
      // },
    ];
  }

  public async updatePatientDepartment(action: string, department?: Department): Promise<void> {
    // create state modal
    const modal = this.modalService.create<SelectModalComponent<Department>>({
      nzTitle: `Add ${this.patient.firstName} ${this.patient.lastName} to department`,
      nzContent: SelectModalComponent,
      nzComponentParams: {
        options: this.departments,
        titleField: 'name',
      },
      nzOnOk: (m) => m.selected,
    });

    // wait for modal to successfully complete
    const state: Department = await modal.afterClose.toPromise();
    if (!state) return;

    const departmentId = department ? department.id : state.id;
    this.managePatientDepartments(action, departmentId, department);
  }

  private managePatientDepartments(action: string, departmentId: number, department?: Department) {
    this.loading = true;
    this.departmentsService[action](this.patient.id, departmentId)
      .pipe(finalize(() => (this.loading = false)))
      .subscribe(
        ({ data }: any) => {
          const updatedDepartment = data[action];
          if (action === 'addPatientToDepartment') {
            this.data.unshift(updatedDepartment);
          } else {
            this.data.splice(
              this.data.findIndex((p) => p.id === this.patient.id),
              1,
              department
            );
          }
        },
        () => this.messageService.error('An error occurred could not update patient', { nzDuration: 3000 })
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
