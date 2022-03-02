import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  CreateOneReportInput,
  CreateReportInput,
  Reports,
  UpdateOneReportInput,
  UpdateReport,
} from '@app/pages/administration/@types/reports';
import { FormBuilder } from '@angular/forms';
import { Role } from '@app/pages/administration/@types/role';
import { finalize } from 'rxjs/operators';
import { RolesService } from '@app/pages/administration/@services/roles.service';
import { ErrorHandlerService } from '@shared/services/error-handler.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ReportsService } from '@app/pages/administration/@services/reports.service';
import { environment } from '@env/environment';
import { Paging } from '@shared/@types/paging';
import { Filter } from '@shared/@types/filter';
import { Sorting } from '@shared/@types/sorting';
import { Convert } from '@shared/classes/convert';
import { ReportForm } from '@app/pages/administration/@forms/report.form';

const CryptoJS = require('crypto-js');

@Component({
  selector: 'app-create-report',
  templateUrl: './create-report.component.html',
  styleUrls: ['./create-report.component.scss'],
})
export class CreateReportComponent implements OnInit {
  roles: Role[] = [];
  selectedRoles: Role[] = [];
  report: Reports;
  reportForm = ReportForm;
  inputMode = true;
  isLoading = false;
  showCancelButton = false;
  populateForm = false;
  resetForm = false;
  loadingMessage = '';
  public editMode = true;
  newMode = false;

  constructor(
    private formBuilder: FormBuilder,
    private rolesService: RolesService,
    private errorService: ErrorHandlerService,
    private message: NzMessageService,
    private reportsService: ReportsService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getReportFromUrl();
    this.getRoles();
  }

  goBack() {
    this.router.navigate(['/mhira/administration/reports']);
  }

  reportHasRole(roleId: number): boolean {
    const roles = this.report?.reportRoles?.filter((role) => role.roleId === roleId);
    return roles?.length > 0;
  }

  assignRoleToReport(role: Role, checked: boolean) {
    if (checked) {
      this.selectedRoles.push(role);
    } else {
      this.selectedRoles.filter((item) => item.id !== role.id);
    }
  }

  public submitForm(reportData: Reports): void {
    if (this.report) {
      reportData.id = this.report.id;
      this.updateReport(reportData);
    } else {
      this.createReport(reportData);
    }
  }

  getReportFromUrl(): void {
    this.activatedRoute.queryParams.subscribe((params) => {
      this.resetForm = false;
      this.populateForm = false;
      if (params.report) {
        this.inputMode = false;
        this.showCancelButton = true;
        const bytes = CryptoJS.AES.decrypt(params.report, environment.secretKey);
        const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
        this.report = decryptedData;
        this.populateForm = true;
      } else {
        this.inputMode = true;
        this.showCancelButton = false;
        this.resetForm = true;
      }
    });
  }

  addRolesToReport(selectedRoles: Role[]) {
    setTimeout(() => {
      console.log('here');
      const rolesID = selectedRoles.map((item) => item.id);
      this.reportsService.addRolesToReport(this.report.id, rolesID).subscribe(
        ({ data }) => {
          this.afterCreate();
        },
        (error) =>
          this.errorService.handleError(error, {
            prefix: 'Unable to create report',
          })
      );
    }, 200);
    console.log('Last check!');
  }

  createReport(formData: any) {
    this.isLoading = true;
    this.populateForm = false;
    this.resetForm = false;
    const inputData: CreateReportInput = Object.assign({}, formData);
    const reportInput: CreateOneReportInput = {
      report: inputData,
    };
    this.loadingMessage = `Creating report ${inputData.name} `;
    this.reportsService
      .createReport(reportInput)
      .pipe(
        finalize(() => {
          this.isLoading = false;
          this.loadingMessage = '';
        })
      )
      .subscribe(
        ({ data }) => {
          this.message.create('success', `Report has successfully been created`);
          this.report = data.createOneReport;
          if (this.selectedRoles.length > 0) {
            this.addRolesToReport(this.selectedRoles);
            console.log(this.selectedRoles);
          }
          this.afterCreate();
        },
        (error) =>
          this.errorService.handleError(error, {
            prefix: 'Unable to create report',
          })
      );
  }

  updateReport(reportUpdates: UpdateReport) {
    delete reportUpdates.id;
    const reportInput: UpdateOneReportInput = {
      id: this.report.id,
      update: reportUpdates,
    };
    this.isLoading = true;
    this.populateForm = false;
    this.resetForm = false;
    this.loadingMessage = `Updating report ${reportUpdates.name}`;
    this.reportsService
      .updateReport(reportInput)
      .pipe(
        finalize(() => {
          this.isLoading = false;
          this.loadingMessage = '';
        })
      )
      .subscribe(
        async ({ data }) => {
          this.message.create('success', `Report has successfully been updated`);
          this.report = data.updateOneReport;
          console.log(this.report);
          if (this.selectedRoles.length > 0) {
            this.addRolesToReport(this.selectedRoles);
            console.log(this.selectedRoles);
          }
        },
        (error) => {
          this.populateForm = true;
          this.errorService.handleError(error, {
            prefix: `Unable to update user "${reportUpdates.name}"`,
          });
        }
      );
  }

  afterCreate() {
    this.populateForm = false;
    this.resetForm = true;
    const dataString = CryptoJS.AES.encrypt(JSON.stringify(this.report), environment.secretKey).toString();
    this.router.navigate(['/mhira/administration/create-report'], {
      state: {
        title: `${this.report.name} `,
      },
      queryParams: {
        report: dataString,
      },
    });
    this.newMode = false;
  }

  getRoles(params?: { paging?: Paging; filter?: Filter; sorting?: Sorting }) {
    const options: any = [];
    this.roles = [];
    this.rolesService.roles(params).subscribe(
      ({ data }: any) => {
        data.roles.edges.map((role: any) => {
          const _role = Convert.toRole(role.node);
          this.roles.push(_role);
          options.push({ label: _role.name, value: _role.id });
        });
        // this.reportForm.groups[0].fields[0].options = options;
        // this.profileFields.groups.map((group) =>
        //   group.fields.map((field) => {
        //     if (field.name === 'roleId') field.options = options;
        //   })
        // );
      },
      (error) => this.errorService.handleError(error, { prefix: 'Unable to load roles' })
    );
  }
}
