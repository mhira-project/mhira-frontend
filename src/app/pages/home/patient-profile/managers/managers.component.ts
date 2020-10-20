import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Patient } from '../../home.interfaces';
import { environment } from '../../../../../environments/environment';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { table } from './managers.table';
import { PatientsService } from '../../@services/patients.service';
import { of, Subject, Subscription } from 'rxjs';
import { debounceTime, delay, distinctUntilChanged, flatMap, map } from 'rxjs/operators';
import * as moment from 'moment';

const CryptoJS = require('crypto-js');

@Component({
  selector: 'app-managers',
  templateUrl: './managers.component.html',
  styleUrls: ['./managers.component.scss'],
})
export class ManagersComponent implements OnInit, OnDestroy {
  @Input() managerType = 'Informant';
  isLoading = false;
  isVisible = false;
  isOkLoading = false;
  patient: Patient;
  users: any[] = [];
  managers: any[] = [];
  managersTable: { columns: any[]; rows: any[] } = {
    columns: table.columns,
    rows: [],
  };
  actions = table.actions;
  searchKeyword: string;

  public keyUp = new Subject<string>();
  private keyUpSubscription: Subscription;

  constructor(
    private patientsService: PatientsService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private modalService: NzModalService,
    private message: NzMessageService
  ) {
    this.keyUpSubscription = this.keyUp
      .pipe(
        map((event: any) => event.target.value),
        debounceTime(1000),
        distinctUntilChanged(),
        flatMap((search) => of(search).pipe(delay(500)))
      )
      .subscribe();
  }

  ngOnInit(): void {
    this.getPatient();
    switch (this.managerType.toLowerCase()) {
      case 'informant':
        this.getManagers('getPatientInformants');
        break;
      case 'clinician':
        this.getManagers('getPatientCaseManagers');
        break;
      default:
        this.getManagers('getPatientInformants');
    }
  }

  ngOnDestroy() {
    this.keyUpSubscription.unsubscribe();
  }

  getPatient() {
    this.activatedRoute.queryParams.subscribe((params) => {
      if (params.profile) {
        const bytes = CryptoJS.AES.decrypt(params.profile, environment.secretKey);
        this.patient = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
      }
    });
  }

  getManagers(query: string) {
    this.isLoading = true;
    this.managers = [];
    const _managers: any[] = [];
    this.patientsService.getPatientManagers(query, { patientId: this.patient?.id }).subscribe(
      async ({ data }) => {
        const managersData = data[query];
        managersData.edges.map((manager: any) => {
          const row = Object.assign({}, manager.node);

          const color = row.active
            ? 'ng-trigger ng-trigger-fadeMotion ant-tag-green ant-tag'
            : 'ng-trigger ng-trigger-fadeMotion ant-tag-red ant-tag';
          const active = row.active ? 'active' : 'inactive';
          row.updatedAt = row.updatedAt ? moment(row.updatedAt).format('DD-MM-YYYY HH:mm') : '';
          row.birthDate = row.birthDate ? moment(row.birthDate).format('DD-MM-YYYY HH:mm') : '';
          row.active = `<nz-tag class="${color}">${active}</nz-tag>`;
          _managers.push(row);
          this.managers.push(manager.node);
        });

        this.managersTable.rows = _managers;
        this.isLoading = false;
      },
      (error) => {
        this.isLoading = false;
      }
    );
  }

  searchUsers() {
    this.isLoading = true;
    this.users = [];
    const _users: any[] = [];
    this.patientsService.searchUser(this.searchKeyword).subscribe(
      async ({ data }) => {
        const usersData = data['getUsers'];
        usersData.edges.map((user: any) => {
          const row = Object.assign({}, user.node);

          const color = row.active
            ? 'ng-trigger ng-trigger-fadeMotion ant-tag-green ant-tag'
            : 'ng-trigger ng-trigger-fadeMotion ant-tag-red ant-tag';
          const active = row.active ? 'active' : 'inactive';
          row.updatedAt = row.updatedAt ? moment(row.updatedAt).format('DD-MM-YYYY HH:mm') : '';
          row.birthDate = row.birthDate ? moment(row.birthDate).format('DD-MM-YYYY HH:mm') : '';
          row.active = `<nz-tag class="${color}">${active}</nz-tag>`;
          _users.push(row);
          this.users.push(user.node);
        });
        this.isLoading = false;
      },
      (error) => {
        this.isLoading = false;
      }
    );
  }

  handleAssign(): void {
    this.isVisible = true;
  }

  handleActionClick(event: any) {
    const rows = this.managersTable.rows;
    switch (event.action.name) {
      case 'Remove Assignment':
        this.modalService.confirm({
          nzTitle: 'Confirm',
          nzContent: `Are you sure you want to remove ${rows[event.index].firstName} ${rows[event.index].lastName}`,
          nzOkText: 'Remove',
          nzOnOk: () => this.removeInManager(rows[event.index]),
          // nzVisible: this.isOkLoading,
          nzOkDisabled: this.isOkLoading,
          nzCancelText: 'Cancel',
        });
        break;
    }
  }

  handleCancel(): void {
    this.isVisible = false;
  }

  assignManager(user: any) {
    const rows = Object.assign([], this.managersTable.rows);
    console.log(rows);
    let query = 'assignPatientInformant';
    switch (this.managerType.toLowerCase()) {
      case 'informant':
        query = 'assignPatientInformant';
        break;
      case 'clinician':
        query = 'assignPatientCaseManager';
        break;
    }
    this.patientsService.assignManager(query, user.id, this.patient.id).subscribe(
      async ({ data }) => {
        user.updatedAt = user.updatedAt ? moment(user.updatedAt).format('DD-MM-YYYY HH:mm') : '';
        rows.unshift(user);
        this.managersTable.rows = rows;
        this.isVisible = false;
        this.isOkLoading = false;
        this.message.create('success', `${this.managerType} has been successfully assigned`);
      },
      (error) => {
        this.isVisible = false;
        this.isOkLoading = false;
        this.message.create('error', `Could not assign ${this.managerType}. An error occurred`);
      }
    );
  }

  removeInManager(user: any) {
    this.isOkLoading = true;
    const rows = this.managersTable.rows;
    let query = 'unassignPatientInformant';
    switch (this.managerType.toLowerCase()) {
      case 'informant':
        query = 'unassignPatientInformant';
        break;
      case 'clinician':
        query = 'unassignPatientCaseManager';
        break;
    }
    this.patientsService.unassignManager(query, user.id, this.patient.id).subscribe(
      async ({ data }) => {
        const deletedIndex = rows.findIndex((_user) => _user.id === user.id);
        rows.splice(deletedIndex, 1);
        this.managersTable.rows = rows;
        this.isVisible = false;
        this.isOkLoading = false;
        this.message.create('success', `${this.managerType} has been successfully removed`);
        return true;
      },
      (error) => {
        this.isVisible = false;
        this.isOkLoading = false;
        this.message.create('error', `Could not remove ${this.managerType}. An error occurred`);
        return true;
      }
    );
    return false;
  }
}
