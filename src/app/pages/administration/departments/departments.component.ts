import { finalize } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { Department, FormattedDepartment, UpdateOneDepartmentInput } from '../@types/department';
import { DepartmentColumns } from '../@tables/departments.table';
import { DepartmentsService } from '../@services/departments.service';
import { DepartmentForm } from '../@forms/department.form';
import { Convert } from '@shared/classes/convert';
import { Paging } from '@shared/@types/paging';
import { Filter } from '@shared/@types/filter';
import { Sorting } from '@shared/@types/sorting';
import {
  DEFAULT_PAGE_SIZE,
  TableColumn,
  SortField,
  Action,
  ActionArgs,
} from '../../../@shared/@modules/master-data/@types/list';
import { PageInfo } from '../../../@shared/@types/paging';
import { AppPermissionsService } from '@app/@shared/services/app-permissions.service';
import { PermissionKey } from '@app/@shared/@types/permission';
import { ErrorHandlerService } from '../../../@shared/services/error-handler.service';
import { NzModalService } from 'ng-zorro-antd/modal';

enum ActionKey {
  EDIT_DEPARTMENT,
  DELETE_DEPARTMENT,
}

@Component({
  selector: 'app-departments',
  templateUrl: './departments.component.html',
  styleUrls: ['./departments.component.scss'],
})
export class DepartmentsComponent implements OnInit {
  public PK = PermissionKey;

  public data: Partial<FormattedDepartment>[];

  public columns: TableColumn<Partial<FormattedDepartment>>[] = DepartmentColumns;

  public isLoading = false;

  public departmentsRequestOptions: { paging: Paging; filter: Filter; sorting: Sorting[] } = {
    paging: { first: DEFAULT_PAGE_SIZE },
    filter: {},
    sorting: [],
  };

  public pageInfo: PageInfo;

  public actions: Action<ActionKey>[] = [];

  // form properties
  public showCreateDepartment = false;
  public populateForm = false;
  public resetForm = false;
  public department: Department;
  public departmentForms = DepartmentForm;

  constructor(
    private departmentsService: DepartmentsService,
    private modalService: NzModalService,
    private errorService: ErrorHandlerService,
    public perms: AppPermissionsService
  ) {}

  public ngOnInit(): void {
    this.getDepartments();

    if (this.perms.permissionsOnly(PermissionKey.MANAGE_SETTINGS)) {
      this.actions = [
        { key: ActionKey.EDIT_DEPARTMENT, title: 'Edit Department' },
        { key: ActionKey.DELETE_DEPARTMENT, title: 'Delete Department' },
      ];
    }
  }

  public onPageChange(paging: Paging): void {
    this.departmentsRequestOptions.paging = paging;
    this.getDepartments();
  }

  public onSort(sorting: SortField<FormattedDepartment>[]): void {
    this.departmentsRequestOptions.sorting = sorting;
    this.getDepartments();
  }

  public onFilter(filter: Filter): void {
    this.departmentsRequestOptions.filter = filter;
    this.getDepartments();
  }

  public onSearch(searchString: string): void {
    this.departmentsRequestOptions.filter = { or: this.createSearchFilter(searchString) };
    this.getDepartments();
  }

  public onAction({ action, context: department }: ActionArgs<FormattedDepartment, ActionKey>): void {
    switch (action.key) {
      case ActionKey.EDIT_DEPARTMENT:
        this.openCreatePanel(department);
        return;

      case ActionKey.DELETE_DEPARTMENT:
        this.deleteDepartment(department);
        return;
    }
  }

  public openCreatePanel(department?: Department): void {
    if (department) this.department = department;
    this.showCreateDepartment = true;
    this.populateForm = true;
    this.resetForm = true;
  }

  public closeCreatePanel(): void {
    this.department = null;
    this.showCreateDepartment = false;
    this.populateForm = false;
    this.resetForm = false;
  }

  public onSubmitForm(department: Department): void {
    if (this.department?.id) {
      department.id = this.department.id;
      this.updateDepartment(department);
    } else {
      this.createDepartment(department);
    }
  }

  private getDepartments(): void {
    this.isLoading = true;
    this.departmentsService
      .departments(this.departmentsRequestOptions)
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe(
        ({ data }: any) => {
          this.data = data.departments.edges.map((department: any) => Convert.toDepartment(department.node));
          this.pageInfo = data.departments.pageInfo;
        },
        (err) => this.errorService.handleError(err, { prefix: 'Unable to load departments' })
      );
  }

  private createSearchFilter(searchString: string): Array<{ [K in keyof Partial<FormattedDepartment>]: {} }> {
    if (!searchString) return [];
    return [{ name: { iLike: `%${searchString}%` } }, { description: { iLike: `%${searchString}%` } }];
  }

  private async deleteDepartment(department: FormattedDepartment): Promise<void> {
    const modal = this.modalService.confirm({
      nzOnOk: () => true,
      nzTitle: 'Delete department',
      nzContent: `
        Are you sure you want to delete ${department.name}? This action is irreversible.
      `,
    });

    if (!(await modal.afterClose.toPromise())) return;

    this.isLoading = true;
    this.departmentsService
      .deleteDepartment(department)
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe(
        () => {
          const data = [...this.data];
          data.splice(this.data.indexOf(department), 1);
          this.data = data; // mutate reference to trigger change detection
        },
        (err) => this.errorService.handleError(err, { prefix: `Unable to delete department "${department.name}"` })
      );
  }

  private createDepartment(department: Department): void {
    this.isLoading = true;
    this.populateForm = false;
    this.resetForm = false;
    this.departmentsService
      .createDepartment(department)
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe(
        ({ data }) => {
          // mutate reference to trigger change detection
          this.data = [...this.data, Convert.toDepartment(data.createOneDepartment)];
          this.closeCreatePanel();
        },
        (err) => this.errorService.handleError(err, { prefix: 'Unable to create department' })
      );
  }

  private updateDepartment(department: Department): void {
    const updateOneDepartmentInput: UpdateOneDepartmentInput = {
      id: department.id,
      update: {
        name: department.name,
        description: department.description,
        active: department.active,
      },
    };
    this.isLoading = true;
    this.departmentsService
      .updateDepartment(updateOneDepartmentInput)
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe(
        ({ data }) => {
          const list = [...this.data];
          const updatedDepartment: Department = Convert.toDepartment(data.updateOneDepartment);
          const idx = list.findIndex((dep) => dep.id === updatedDepartment.id);
          list.splice(idx, 1, updatedDepartment);
          this.data = list; // mutate reference to trigger change detection
          this.closeCreatePanel();
        },
        (err) => this.errorService.handleError(err, { prefix: 'Unable to update department' })
      );
  }
}
