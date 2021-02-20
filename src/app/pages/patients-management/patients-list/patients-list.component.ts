import { Component } from '@angular/core';
import { PatientColumns } from '../@tables/patients.table';
import { PatientsService } from '@app/pages/patients-management/@services/patients.service';
import { Router } from '@angular/router';
import { environment } from '@env/environment';
// import { Paging } from '@shared/@types/paging';
import { PatientModel } from '@app/pages/patients-management/@models/patient.model';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { Sorting } from '@shared/@types/sorting';
import { PatientStatus } from '@app/pages/patients-management/@types/patient-status';
import { PatientStatusesService } from '@app/pages/patients-management/@services/patient-statuses.service';
import {
  TableColumn,
  SortField,
} from '../../../@shared/@modules/master-data/master-data-table/master-data-table.component';
import { FormattedPatient } from '../@types/formatted-patient';
import { finalize } from 'rxjs/operators';
import { Action, ActionArgs } from '../../../@shared/@modules/master-data/master-data-list/master-data-list.component';
import { SelectModalComponent } from '../../../@shared/components/select-modal/select-modal.component';
import { PageInfo, Paging } from '../../../@shared/@types/paging';
import { Filter } from '../../../@shared/@types/filter';
import { User } from '@app/pages/user-management/@types/user';
import { PermissionKey } from '@app/@shared/@types/permission';
import { AppPermissionsService } from '../../../@shared/services/app-permissions.service';

const CryptoJS = require('crypto-js');

enum ActionKey {
  CHANGE_STATUS = 'change-status',
  DELETE_PATIENT = 'delete-patient',
}

@Component({
  selector: 'app-patients',
  templateUrl: './patients-list.component.html',
  styleUrls: ['./patients-list.component.scss'],
})
export class PatientsListComponent {
  PK = PermissionKey;

  public columns: TableColumn<Partial<FormattedPatient>>[] = PatientColumns as TableColumn<Partial<FormattedPatient>>[];

  public data: Partial<FormattedPatient>[];

  public pageInfo: PageInfo;

  public pageSize = 10;

  public patientRequestOptions: { paging: Paging; filter: Filter; sorting: Sorting[] } = {
    paging: { first: this.pageSize },
    filter: {},
    sorting: [],
  };

  public end = false;

  public loading = false;

  public actions: Action[] = [];

  public patientStates: PatientStatus[] = [];

  private onlyMyPatients = false;

  constructor(
    private patientsService: PatientsService,
    private router: Router,
    private modalService: NzModalService,
    private patientStateService: PatientStatusesService,
    private messageService: NzMessageService,
    public perms: AppPermissionsService
  ) {
    this.getPatients();
    this.getPatientStates();

    if (this.perms.permissionsOnly(PermissionKey.MANAGE_PATIENTS)) {
      this.actions = [
        { key: ActionKey.CHANGE_STATUS, title: 'Change Status' },
        { key: ActionKey.DELETE_PATIENT, title: 'Delete Patient' },
      ];
    }
  }

  public searchPatients(searchString: string): void {
    this.patientRequestOptions.filter = { or: this.createSearchFilter(searchString) };
    this.getPatients();
  }

  public onPageChange(paging: Paging): void {
    this.patientRequestOptions.paging = paging;
    this.getPatients();
  }

  public onSort(sorting: SortField<FormattedPatient>[]): void {
    this.patientRequestOptions.sorting = sorting;
    this.getPatients();
  }

  public onFilter(filter: Filter): void {
    this.patientRequestOptions.filter = filter;
    this.getPatients();
  }

  public onMyPatients(): void {
    this.onlyMyPatients = !this.onlyMyPatients;
    this.getPatients();
  }

  public onPatientSelect(patient: FormattedPatient): void {
    const dataString = CryptoJS.AES.encrypt(JSON.stringify(patient), environment.secretKey).toString();
    this.router.navigate(['/mhira/case-management/profile'], {
      queryParams: {
        profile: dataString,
      },
    });
  }

  public onAction({ action, context: patient }: ActionArgs<FormattedPatient>): void {
    switch (action.key) {
      case ActionKey.CHANGE_STATUS:
        this.changePatientStatus(patient);
        return;
      case ActionKey.DELETE_PATIENT:
        this.deletePatient(patient);
        return;
    }
  }

  private getPatients(): void {
    this.loading = true;
    const options = { ...this.patientRequestOptions };

    // apply for only my patients
    if (this.onlyMyPatients)
      options.filter = {
        ...options.filter,
        and: [{ caseManagers: { id: { eq: this.userId } } }, ...(options.filter.and ?? [])],
      };

    this.patientsService
      .patients(options)
      .pipe(finalize(() => (this.loading = false)))
      .subscribe((patients) => {
        this.data = patients.data.patients.edges.map((e: any) => PatientModel.fromJson(e.node));
        this.pageInfo = patients.data.patients.pageInfo; // TODO: remove
      });
  }

  private createSearchFilter(searchString: string) {
    if (!searchString) return [];
    return [
      { firstName: { iLike: `%${searchString}%` } },
      { middleName: { iLike: `%${searchString}%` } },
      { lastName: { iLike: `%${searchString}%` } },
      {
        informants: {
          or: [
            { firstName: { iLike: `%${searchString}%` } },
            { middleName: { iLike: `%${searchString}%` } },
            { lastName: { iLike: `%${searchString}%` } },
          ],
        },
      },
      {
        caseManagers: {
          or: [
            { firstName: { iLike: `%${searchString}%` } },
            { middleName: { iLike: `%${searchString}%` } },
            { lastName: { iLike: `%${searchString}%` } },
          ],
        },
      },
      { medicalRecordNo: { iLike: `%${searchString}%` } },
    ];
  }

  private getPatientStates() {
    this.patientStateService.patientStatuses().subscribe((result) => {
      this.patientStates = result.data.patientStatuses.edges.map((e: any) => e.node);

      // append status options on status filter
      const statusCol = this.columns.find((c) => c.name === 'formattedStatus');
      statusCol.filterField.options = [
        ...this.patientStates.map((ps) => ({ label: ps.name, value: ps.id })),
        { label: 'not set', value: null },
      ];
      this.columns = [...this.columns]; // trigger setter to re-render filter
    });
  }

  private async changePatientStatus(patient: FormattedPatient): Promise<void> {
    // create state modal
    const modal = this.modalService.create<SelectModalComponent<PatientStatus>>({
      nzTitle: `Change status of ${patient.firstName} ${patient.lastName}`,
      nzContent: SelectModalComponent,
      nzComponentParams: {
        options: this.patientStates,
        selected: this.patientStates.find((s) => s.id === patient.statusId),
        titleField: 'name',
      },
      nzOnOk: (m) => m.selected,
    });

    // wait for modal to successfully complete
    const state: PatientStatus = await modal.afterClose.toPromise();
    if (!state) return;

    // update patient
    patient.statusId = state.id;
    this.loading = true;
    this.patientsService
      .updatePatient(PatientModel.updateData(patient))
      .pipe(finalize(() => (this.loading = false)))
      .subscribe(
        ({ data }) => {
          patient = PatientModel.fromJson(data.updateOnePatient);
          this.data.splice(
            this.data.findIndex((p) => p.id === patient.id),
            1,
            patient
          );
        },
        () => this.messageService.error('An error occurred could not update patient', { nzDuration: 3000 })
      );
  }

  private async deletePatient(patient: FormattedPatient): Promise<void> {
    // create confirmation modal
    const modal = this.modalService.confirm({
      nzOnOk: () => true,
      nzTitle: 'Delete Patient',
      nzContent: `
        Are you sure you want to delete ${patient.firstName} ${patient.lastName}? This action is irreversible
      `,
    });

    // wait for modal to successfully complete
    const confirmation = await modal.afterClose.toPromise();
    if (!confirmation) return;

    // delete patient
    this.loading = true;
    this.patientsService
      .deletePatient(patient)
      .pipe(finalize(() => (this.loading = false)))
      .subscribe(
        () => this.data.splice(this.data.indexOf(patient), 1),
        () => this.messageService.error('An error occurred could not delete patient', { nzDuration: 3000 })
      );
  }

  private get userId(): number {
    const user = JSON.parse(localStorage.getItem('user')) as User;
    return user.id ?? 0;
  }
}
