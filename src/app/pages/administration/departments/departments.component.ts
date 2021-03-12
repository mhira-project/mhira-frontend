import { finalize } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { Department, FormattedDepartment, UpdateOneDepartmentInput } from '../@types/department';
import { DepartmentColumns } from '../@tables/departments.table';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
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
    private messageService: NzMessageService,
    public perms: AppPermissionsService
  ) {}

  public ngOnInit(): void {
    this.getDepartments();

    if (this.perms.permissionsOnly(PermissionKey.MANAGE_DEPARTMENTS)) {
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
      .subscribe(({ data }: any) => {
        this.data = data.departments.edges.map((department: any) => Convert.toDepartment(department.node));
        this.pageInfo = data.departments.pageInfo;
      });
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

    const confirmation = await modal.afterClose.toPromise();
    if (!confirmation) return;

    this.isLoading = true;
    this.departmentsService
      .deleteDepartment(department)
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe(
        () => this.data.splice(this.data.indexOf(department), 1),
        () => this.messageService.error('An error occurred could not delete department', { nzDuration: 3000 })
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
          this.data.push(Convert.toDepartment(data.createOneDepartment));
          this.closeCreatePanel();
        },
        () => this.messageService.error('An error occured, could not create department', { nzDuration: 3000 })
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
          const updatedDepartment: Department = Convert.toDepartment(data.updateOneDepartment);
          const idx = this.data.findIndex((dep) => dep.id === updatedDepartment.id);
          this.data.splice(idx, 1, updatedDepartment);
          this.closeCreatePanel();
        },
        () => this.messageService.error('An error occured, could not update department', { nzDuration: 3000 })
      );
  }
}
