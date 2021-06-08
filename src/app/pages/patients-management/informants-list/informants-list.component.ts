import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { InformantModel } from '../@models/informant-model';
import { Informant } from '../@types/informant';
import { InformantsTable } from '../@tables/informants.table';
import { InformantForm } from '../@forms/informant.form';
import { AppPermissionsService } from '@shared/services/app-permissions.service';
import { InformantService } from '../@services/informant.service';
import { Paging } from '@shared/@types/paging';
import { Sorting } from '@shared/@types/sorting';
import { PatientsService } from '@app/pages/patients-management/@services/patients.service';
import { Patient } from '@app/pages/patients-management/@types/patient';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-informants-list',
  templateUrl: './informants-list.component.html',
  styleUrls: ['./informants-list.component.scss'],
})
export class InformantsListComponent implements OnInit {
  isLoading = false;
  modalLoading = false;
  @Input() patient: Patient;
  informants: Informant[] = [];
  paging: Paging = {
    first: 10,
  };
  pageInfo: any;
  informantsTable: { columns: any[]; rows: Informant[] } = {
    columns: InformantsTable.columns,
    rows: [],
  };
  actions = InformantsTable.actions;

  showCreateInformant = false;
  panelTitle = 'Create Informant';
  loadingMessage = '';
  informantForms = InformantForm;
  hasErrors = false;
  errors: string[] = [];
  inputMode = true;
  showCancelButton = false;
  isCreateAction = false;
  selectedIndex = -1;

  constructor(
    private informantsService: InformantService,
    private patientService: PatientsService,
    private modalService: NzModalService,
    private message: NzMessageService,
    private router: Router,
    public perms: AppPermissionsService
  ) {}

  ngOnInit(): void {
    if (this.patient) {
      const filter = {
        or: [{ id: { eq: this.patient.id } }],
      };
      this.populatePatientsDropDown(filter);
    }
    this.getInformants({ filter: {} });
  }

  getInformants(params?: { paging?: Paging; filter?: any; sorting?: Sorting }) {
    this.isLoading = true;
    if (this.patient) {
      params.filter = {
        or: [{ patientId: { eq: this.patient.id } }],
      };
    }
    this.informants = [];
    this.informantsTable.rows = [];
    this.informantsService.informants(params).subscribe(
      async ({ data }: any) => {
        data.informants.edges.map((informant: any) => {
          this.informants.push(InformantModel.fromJson(informant.node));
        });
        this.informantsTable.rows = this.informants;
        this.paging.after = data.informants.pageInfo.endCursor;
        this.paging.before = data.informants.pageInfo.startCursor;
        this.pageInfo = data.informants.pageInfo;
        this.isLoading = false;
      },
      (error: any) => {
        this.isLoading = false;
      }
    );
  }

  populatePatientsDropDown(filter: any) {
    this.informantForms.groups[0].fields[6].options = [];
    const options: { label: string; value: number }[] = [];
    this.patientService.patients({ filter }).subscribe(
      async ({ data }) => {
        data.patients.edges.map((patient: any) => {
          const option = { value: patient.node.id, label: `${patient.node.firstName} ${patient.node.lastName}` };
          if (options.indexOf(option) === -1) {
            options.push(option);
          }
        });
        this.informantForms.groups[0].fields[6].options = options;
      },
      (error) => {
        this.isLoading = false;
      }
    );
  }

  searchPatients(search: any) {
    if (search.field.name === 'patientId') {
      const keyword = search.keyword;
      const filter = {
        or: [{ firstName: { iLike: keyword } }, { middleName: { iLike: keyword } }, { lastName: { iLike: keyword } }],
      };
      this.searchPatients(filter);
    }
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
    this.getInformants({ paging: this.paging });
  }

  toggleCreatePanel(create: boolean = true) {
    this.isCreateAction = create;
    this.showCreateInformant = !this.showCreateInformant;
    this.panelTitle = this.isCreateAction ? 'Create Informant' : 'Update Informant';
    if (create) {
      this.resetForm();
    }
  }

  resetForm() {
    this.selectedIndex = -1;
    this.informantForms.groups.map((group) => {
      group.fields.map((field) => {
        field.value = null;
      });
    });
  }

  handleActionClick(event: any): void {
    this.selectedIndex = event.index;
    switch (event.action.name) {
      case 'Edit Informant':
        this.informantForms.groups.map((group) => {
          group.fields.map((field) => {
            field.value = this.informants[event.index][field.name];
          });
        });
        this.toggleCreatePanel(false);
        break;
      case 'Delete Informant':
        this.modalService.confirm({
          nzTitle: 'Confirm',
          nzContent: `Are you sure you want to delete informant for
               <b>${this.informants[event.index].firstName}</b>`,
          nzOkText: 'Delete',
          nzOnOk: () => this.deleteInformant(this.informants[event.index]),
          nzOkDisabled: this.modalLoading,
          nzCancelText: 'Cancel',
        });
        break;
    }
  }

  createInformant(informant: Informant) {
    this.isLoading = true;
    this.hasErrors = false;
    this.errors = [];
    this.loadingMessage = `Creating informant ${informant.firstName}`;
    this.informantsService.createInformant(informant).subscribe(
      async ({ data }) => {
        this.informants.unshift(InformantModel.fromJson(data.createOneInformant));
        this.informantsTable.rows = this.informants;
        this.isLoading = false;
        this.loadingMessage = '';
        this.toggleCreatePanel();
        this.message.create('success', `Informant has successfully been created`);
      },
      (error) => {
        this.hasErrors = true;
        this.errors = error.graphQLErrors.map((x: { message: string }) => x.message);
        this.isLoading = false;
        this.loadingMessage = '';
      }
    );
  }

  updateInformant(informant: Informant) {
    this.isLoading = true;

    this.informantsService.updateInformant(informant).subscribe(
      ({ data }) => {
        const newInformant = data.updateOneInformant;
        this.informants[this.selectedIndex] = InformantModel.fromJson(newInformant);
        this.isLoading = false;
        this.toggleCreatePanel();
        this.message.success('Informant has been successfully edited', {
          nzDuration: 3000,
        });
      },
      (error) => {
        this.errors = error.graphQLErrors.map((x: { message: string }) => x.message);
        this.isLoading = false;
      }
    );
  }

  deleteInformant(informant: Informant) {
    this.modalLoading = true;
    this.informantsService.deleteInformant(informant).subscribe(
      async ({ data }: any) => {
        this.informants.splice(this.selectedIndex, 1);
        this.modalLoading = false;
        this.message.create('success', `informant has been successfully deleted`);
      },
      (error: any) => {
        this.modalLoading = false;
        this.message.create('error', `could not remove informant for ${informant.firstName}`);
      }
    );
  }

  submitForm(informant: Informant) {
    if (this.isCreateAction) {
      this.createInformant(informant);
    } else {
      informant.id = this.informants[this.selectedIndex].id;
      this.updateInformant(informant);
    }
  }
}
