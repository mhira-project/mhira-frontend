import { Component, OnInit, OnDestroy } from '@angular/core';
import { table } from './informants.table';
import { ActivatedRoute, Router } from '@angular/router';
import { PatientsService } from '@app/pages/home/@services/patients.service';
import * as moment from 'moment';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { environment } from '@env/environment';
import { Patient } from '@app/pages/home/home.interfaces';
import { Observable, of, Subject, Subscription } from 'rxjs';
import { debounceTime, delay, distinctUntilChanged, flatMap, map, tap } from 'rxjs/operators';

const CryptoJS = require('crypto-js');

@Component({
  selector: 'app-informants',
  templateUrl: './informants.component.html',
  styleUrls: ['./informants.component.scss'],
})
export class InformantsComponent implements OnInit, OnDestroy {
  isLoading = false;
  isVisible = false;
  isOkLoading = false;
  patient: Patient;
  users: any[] = [];
  managers: any[] = [];
  informantsTable: { columns: any[]; rows: any[] } = {
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
      .subscribe(console.log);
  }

  ngOnInit(): void {
    this.getPatient();
    this.getManagers('informants');
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

  getManagers(managerType: string) {
    this.isLoading = true;
    this.managers = [];
    const _managers: any[] = [];
    this.patientsService.getPatientManagers(managerType, this.patient.id).subscribe(
      async ({ data }) => {
        const managersData = data['getUsers'];
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

        this.informantsTable.rows = _managers;
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

        this.informantsTable.rows = _users;
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
    switch (event.action.name) {
      case 'Remove Assignment':
        this.modalService.confirm({
          nzTitle: 'Confirm',
          nzContent: `Are you sure you want to remove ${this.users[event.index].firstName} ${
            this.users[event.index].lastName
          }`,
          nzOkText: 'Remove',
          nzOnOk: () => this.removeInformant(this.users[event.index]),
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

  assignInformant(user: any) {
    this.patientsService.assignClinician(user.id, this.patient.id).subscribe(
      async ({ data }) => {
        this.users.unshift(user);
        this.informantsTable.rows = this.users;
        this.isVisible = false;
        this.isOkLoading = false;
        this.message.create('success', `Informant has been successfully assigned`);
      },
      (error) => {
        this.isVisible = false;
        this.isOkLoading = false;
        this.message.create('error', `Could not assign informant. An error occurred`);
      }
    );
  }

  removeInformant(user: any) {
    this.isOkLoading = true;
    this.patientsService.unassignClinician(user.id, this.patient.id).subscribe(
      async ({ data }) => {
        const deletedIndex = this.users.findIndex((_user) => _user.id === user.id);
        this.users.splice(deletedIndex, 1);
        this.informantsTable.rows.splice(deletedIndex, 1);
        this.isVisible = false;
        this.isOkLoading = false;
        this.message.create('success', `Informant has been successfully removed`);
        return true;
      },
      (error) => {
        this.isVisible = false;
        this.isOkLoading = false;
        this.message.create('error', `Could not remove informant. An error occurred`);
        return true;
      }
    );
    return false;
  }
}
