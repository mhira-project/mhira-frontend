import { Component, OnInit } from '@angular/core';
import { Department, UpdateOneDepartmentInput } from '../@types/department';
import { DepartmentsTable } from '../@tables/departments.table';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { Router } from '@angular/router';
import { DepartmentsService } from '../@services/departments.service';
import { DepartmentForm } from '../@forms/department.form';
import { AppPermissionsService } from '@shared/services/app-permissions.service';
import { Convert } from '@shared/classes/convert';
import { Paging } from '@shared/@types/paging';
import { Filter } from '@shared/@types/filter';
import { Sorting } from '@shared/@types/sorting';
import { PermissionKey } from '@app/@shared/@types/permission';
import { PaginationService } from '@shared/services/pagination.service';

const CryptoJS = require('crypto-js');

@Component({
  selector: 'app-departments',
  templateUrl: './departments.component.html',
  styleUrls: ['./departments.component.scss'],
})
export class DepartmentsComponent implements OnInit {
  PK = PermissionKey;
  isLoading = false;
  modalLoading = false;
  populateForm = false;
  resetForm = false;
  departments: Department[] = [];
  paging: Paging = {
    first: 10,
  };
  pageInfo: any;
  departmentsTable: { columns: any[]; rows: Department[] } = {
    columns: DepartmentsTable.columns,
    rows: [],
  };
  actions = DepartmentsTable.actions;
  department: Department;
  showCreateDepartment = false;
  panelTitle = 'Create Department';
  loadingMessage = '';
  departmentForms = DepartmentForm;
  hasErrors = false;
  errors: string[] = [];
  inputMode = true;
  showCancelButton = false;
  isCreateAction = false;

  constructor(
    private departmentsService: DepartmentsService,
    private modalService: NzModalService,
    private message: NzMessageService,
    private router: Router,
    public perms: AppPermissionsService,
    private paginationService: PaginationService
  ) {}

  ngOnInit(): void {
    this.getDepartments();
  }

  getDepartments(params?: { paging?: Paging; filter?: Filter; sorting?: Sorting }) {
    this.isLoading = true;
    this.departments = [];
    this.departmentsTable.rows = [];
    this.departmentsService.departments(params).subscribe(
      async ({ data }: any) => {
        data.departments.edges.map((department: any) => {
          this.departments.push(Convert.toDepartment(department.node));
        });
        this.departmentsTable.rows = this.departments;
        this.paging.after = data.departments.pageInfo.endCursor;
        this.paging.before = data.departments.pageInfo.startCursor;
        this.pageInfo = data.departments.pageInfo;
        this.isLoading = false;
      },
      (error: any) => {
        this.isLoading = false;
      }
    );
  }

  navigatePages(direction: 'next' | 'previous', pageSize: number = 10) {
    const paging = this.paginationService.navigatePages(this.paging, direction, pageSize);
    this.getDepartments({ paging });
  }

  deleteDepartment(department: Department) {
    this.modalLoading = true;
    this.departmentsService.deleteDepartment(department).subscribe(
      async ({ data }: any) => {
        const deletedIndex = this.departments.findIndex((_department) => _department.id === department.id);
        this.departments.splice(deletedIndex, 1);
        this.departmentsTable.rows.splice(deletedIndex, 1);
        this.modalLoading = false;
        this.message.create('success', `department has been successfully deleted`);
      },
      (error: any) => {
        this.modalLoading = false;
        this.message.create('error', `could not remove department for ${department.name}`);
      }
    );
  }

  handleActionClick(event: any): void {
    this.department = Object.assign({}, this.departments[event.index]);
    switch (event.action.name) {
      case 'Delete Department':
        this.modalService.confirm({
          nzTitle: 'Confirm',
          nzContent: `Are you sure you want to delete department for
               <b>${this.departments[event.index].name}</b>`,
          nzOkText: 'Delete',
          nzOnOk: () => this.deleteDepartment(this.departments[event.index]),
          nzOkDisabled: this.modalLoading,
          nzCancelText: 'Cancel',
        });
        break;
      case 'Edit Department':
        this.toggleCreatePanel(false);
        this.populateForm = true;
        break;
    }
  }

  handleRowClick(event: any) {
    if (!this.perms.permissionsOnly([PermissionKey.MANAGE_SETTINGS])) return;

    this.department = this.departments[event.index];
    this.populateForm = true;
    this.toggleCreatePanel(false);
  }

  closeCreatePanel() {
    this.populateForm = false;
    this.resetForm = false;
    this.showCreateDepartment = false;
  }

  toggleCreatePanel(create: boolean = true) {
    this.showCreateDepartment = !this.showCreateDepartment;
    this.isCreateAction = create;
    this.panelTitle = this.isCreateAction ? 'Create Department' : 'Update Department';
    this.departmentForms.submitButtonText = this.isCreateAction ? 'Create Department' : 'Update Department';
  }

  createDepartment(department: Department) {
    this.isLoading = true;
    this.hasErrors = false;
    this.populateForm = false;
    this.resetForm = false;
    this.errors = [];
    this.loadingMessage = `Creating department ${department.name}`;
    this.departmentsService.createDepartment(department).subscribe(
      async ({ data }) => {
        this.departments.push(Convert.toDepartment(data.createOneDepartment));
        this.departmentsTable.rows = this.departments;
        this.isLoading = false;
        this.loadingMessage = '';
        this.resetForm = true;
        this.toggleCreatePanel();
        this.message.create('success', `Department has successfully been created`);
      },
      (error) => {
        this.hasErrors = true;
        error.graphQLErrors.map((_error: any) => {
          this.errors.push(_error.message);
        });
        this.isLoading = false;
        this.loadingMessage = '';
      }
    );
  }

  submitForm(departmentData: any) {
    if (this.isCreateAction) {
      this.createDepartment(departmentData);
    } else {
      departmentData.id = this.department.id;
      this.updateDepartment(departmentData);
    }
  }

  private updateDepartment(department: Department) {
    const updateOneDepartmentInput: UpdateOneDepartmentInput = {
      id: department.id,
      update: {
        name: department.name,
        description: department.description,
        active: department.active,
      },
    };
    this.isLoading = true;
    this.hasErrors = false;
    this.errors = [];
    this.loadingMessage = `Updating department ${department.name}`;
    this.departmentsService.updateDepartment(updateOneDepartmentInput).subscribe(
      async ({ data }) => {
        const updatedDepartment: Department = Convert.toDepartment(data.updateOneDepartment);
        this.departments = this.departments.map((dep: Department) => {
          if (dep.id === updatedDepartment.id) {
            dep = updatedDepartment;
          }
          return dep;
        });
        this.departmentsTable.rows = this.departments;
        this.isLoading = false;
        this.loadingMessage = '';
        this.resetForm = true;
        this.populateForm = false;
        this.toggleCreatePanel();
        this.message.create('success', `Department has successfully been updated`);
        this.department = null;
      },
      (error) => {
        this.hasErrors = true;
        error.graphQLErrors.map((_error: any) => {
          this.errors.push(_error.message);
        });
        this.isLoading = false;
        this.loadingMessage = '';
      }
    );
  }
}
