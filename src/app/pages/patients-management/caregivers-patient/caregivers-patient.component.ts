import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  Caregiver,
  FormattedCaregiver,
  UpdateOnePatientCaregiverInput,
} from '@app/pages/patients-management/@types/caregiver';
import { PermissionKey } from '@shared/@types/permission';
import {
  Action,
  ActionArgs,
  DEFAULT_PAGE_SIZE,
  SortField,
  TableColumn,
} from '@shared/@modules/master-data/@types/list';
import { PageInfo, Paging } from '@shared/@types/paging';
import { Filter } from '@shared/@types/filter';
import { Sorting } from '@shared/@types/sorting';
import { FormattedPatient } from '@app/pages/patients-management/@types/formatted-patient';
import { finalize } from 'rxjs/operators';
import { CaregiversPatientService } from '@app/pages/patients-management/@services/caregivers-patient.service';
import { CaregiversPatientTable } from '@app/pages/patients-management/@tables/caregivers-patient.table';
import { AppPermissionsService } from '@shared/services/app-permissions.service';
import { FormGroup } from '@angular/forms';
import { ErrorHandlerService } from '@shared/services/error-handler.service';
import { CaregiversPatientForm } from '@app/pages/patients-management/@forms/caregivers-patient.form';
import { CaregiversService } from '@app/pages/patients-management/@services/caregivers.service';

enum ActionKey {
  REMOVE_CAREGIVER,
  EDIT_CAREGIVER,
}

@Component({
  selector: 'app-caregivers-patient',
  templateUrl: './caregivers-patient.component.html',
  styleUrls: ['./caregivers-patient.component.scss'],
})
export class CaregiversPatientComponent implements OnInit {
  @Input() public patient: FormattedPatient;
  @Input() public caregivers: Caregiver[] = [];
  @Output() patientCaregiversUpdated: EventEmitter<any> = new EventEmitter<any>();

  public PK = PermissionKey;
  public data: Partial<Caregiver>[];
  public columns: TableColumn<Partial<Caregiver>>[] = CaregiversPatientTable as TableColumn<Partial<Caregiver>>[];
  public addCaregiverForm: FormGroup;
  public selectedCaregiver: Caregiver;

  // form properties
  public showAddCaregiver = false;
  showCancelButton = false;
  public showCreateCaregiver = false;
  public populateForm = false;
  public resetForm = false;
  public caregiver: Caregiver;
  public caregiverForm = CaregiversPatientForm;

  public caregiverRequestOptions: { paging: Paging; filter: Filter; sorting: Sorting[] } = {
    paging: { first: DEFAULT_PAGE_SIZE },
    filter: {},
    sorting: [],
  };

  public pageInfo: PageInfo;
  public end = false;
  public isLoading = false;
  public actions: Action<ActionKey>[] = [];

  constructor(
    private caregiversPatientService: CaregiversPatientService,
    private errorService: ErrorHandlerService,
    private caregiversService: CaregiversService,
    public perms: AppPermissionsService
  ) {}

  ngOnInit(): void {
    this.getCaregivers();
    this.setActions();
  }

  public onCaregiverSelect(caregiver: Caregiver) {
    this.selectedCaregiver = caregiver;
  }

  public addCaregiverToPatient() {
    this.managePatientCaregivers(ActionKey.EDIT_CAREGIVER, this.selectedCaregiver, true);
    this.closeAddPanel();
  }

  public searchCaregivers(searchString: string): void {
    this.caregiverRequestOptions.filter = {
      or: this.createSearchFilter(searchString),
    };
    this.getCaregivers();
  }

  public onPageChange(paging: Paging): void {
    this.caregiverRequestOptions.paging = paging;
    this.getCaregivers();
  }

  public onSort(sorting: SortField<Caregiver>[]): void {
    this.caregiverRequestOptions.sorting = sorting;
    this.getCaregivers();
  }

  public onFilter(filter: Filter): void {
    this.caregiverRequestOptions.filter = filter;
    this.getCaregivers();
  }

  public onSearch(searchString: string): void {
    this.caregiverRequestOptions.filter = { or: this.createSearchFilter(searchString) };
    this.getCaregivers();
  }

  public openAddPanel(caregiver?: Caregiver): void {
    if (caregiver) this.caregiver = caregiver;
    this.showAddCaregiver = true;
    this.populateForm = true;
    this.resetForm = true;
  }

  public closeAddPanel(): void {
    this.caregiver = null;
    this.showAddCaregiver = false;
    this.populateForm = false;
    this.resetForm = false;
  }

  public openCreatePanel(caregiver?: Caregiver): void {
    if (caregiver) {
      this.caregiver = caregiver;
      // this.disableEnableFields();
    }
    this.showCreateCaregiver = true;
    this.populateForm = true;
    this.resetForm = true;
  }

  public closeCreatePanel(): void {
    this.caregiver = null;
    this.showCreateCaregiver = false;
    this.populateForm = false;
    this.resetForm = false;
  }

  public onSubmitForm(caregiver: Caregiver): void {
    if (this.caregiver?.id) {
      caregiver.id = this.caregiver.id;
      this.updateCaregiversPatient(caregiver);
    } else {
      this.createCaregiversPatient(caregiver);
    }
  }

  public onAction({ action, context: caregiver }: ActionArgs<Caregiver, ActionKey>): void {
    switch (action.key) {
      case ActionKey.REMOVE_CAREGIVER:
        this.managePatientCaregivers(ActionKey.REMOVE_CAREGIVER, caregiver);
        return;
    }
  }

  public handleRowClick(event: any) {
    if (!this.perms.permissionsOnly([PermissionKey.MANAGE_PATIENTS])) return;
    this.populateForm = true;
    this.openCreatePanel(event);
  }

  private createSearchFilter(searchString: string): Array<{ [K in keyof Partial<FormattedCaregiver>]: {} }> {
    if (!searchString) return [];
    return [{ relation: { iLike: `%${searchString}%` } }, { note: { iLike: `%${searchString}%` } }];
  }

  private getCaregivers(getAllCaregivers: boolean = false): void {
    this.isLoading = true;
    const options = { ...this.caregiverRequestOptions };
    options.filter = {
      ...options.filter,
      and: [getAllCaregivers ? {} : { patient: { id: { eq: this.patient?.id } } }, ...(options.filter.and ?? [])],
    };

    this.caregiversPatientService
      .caregiversPatient(options)
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe((response) => {
        this.data = response.data.patientCaregivers.edges
          .filter((e: any) => e.node.caregiver)
          .map((e: any) => ({
            ...e.node?.caregiver,
            patientCaregiverId: e.node.id,
            relation: e.node.relation,
            emergency: e.node.emergency,
            note: e.node.note,
          }));
        this.pageInfo = response.data.patientCaregivers.pageInfo;
      });
  }

  private managePatientCaregivers(action: ActionKey, caregiver: Caregiver, shouldOpen: boolean = false) {
    this.isLoading = true;
    const executedAction =
      action === ActionKey.EDIT_CAREGIVER
        ? this.caregiversPatientService.addCaregiversToPatient(this.patient.id, caregiver)
        : this.caregiversPatientService.removeCaregiversFromPatient(caregiver.patientCaregiverId);
    executedAction.pipe(finalize(() => (this.isLoading = false))).subscribe(
      (response) => {
        if (action === ActionKey.EDIT_CAREGIVER) {
          // mutate reference to trigger change detection
          this.data = [{ ...caregiver, patientCaregiverId: response.data.createOnePatientCaregiver.id }, ...this.data];
          if (shouldOpen) {
            this.populateForm = true;
            setTimeout(() => {
              this.openCreatePanel(caregiver);
            }, 0);
          }
        } else {
          const list = [...this.data];
          list.splice(
            list.findIndex((p) => p.id === caregiver.id),
            1
          );
          this.data = list; // mutate reference to trigger change detection
        }
        this.closeAddPanel();
        this.patientCaregiversUpdated.emit({
          action,
          caregivers: this.data,
        });
        this.getCaregivers();
      },
      (error) => this.errorService.handleError(error, { prefix: 'Unable to update caregiver on patient' })
    );
  }

  private setActions(): void {
    if (this.perms.permissionsOnly(PermissionKey.MANAGE_PATIENTS)) {
      this.actions = [
        ...this.actions,
        {
          key: ActionKey.REMOVE_CAREGIVER,
          title: 'Remove patient from Caregiver',
        },
      ];
    }
  }

  private createCaregiversPatient(caregiver: Caregiver): void {
    this.isLoading = true;
    this.populateForm = false;
    this.resetForm = false;
    const patientCaregiverData = {
      relation: caregiver.relation,
      note: caregiver.note,
      emergency: caregiver.emergency,
    };
    delete caregiver.relation;
    delete caregiver.note;
    delete caregiver.emergency;
    this.caregiversService
      .createCaregiver(caregiver)
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe(
        ({ data }) => {
          // mutate reference to trigger change detection
          this.closeCreatePanel();
          // this.data = [...this.data, data.createOneCaregiver];

          this.managePatientCaregivers(ActionKey.EDIT_CAREGIVER, {
            ...data.createOneCaregiver,
            ...patientCaregiverData,
          });
          // this.getCaregivers();
        },
        (err) => this.errorService.handleError(err, { prefix: 'Unable to create Caregiver' })
      );
  }

  private updateCaregiversPatient(caregiver: Caregiver): void {
    const caregiverLocal = JSON.parse(JSON.stringify(caregiver));

    const updateOnePatientCaregiverInput: UpdateOnePatientCaregiverInput = {
      emergency: caregiverLocal.emergency,
      note: caregiverLocal.note,
      relation: caregiverLocal.relation,
    };
    const { patientCaregiverId } = this.data.find((entry) => entry.id === caregiver.id);

    delete caregiverLocal.relation;
    delete caregiverLocal.emergency;
    delete caregiverLocal.note;
    const id = caregiverLocal.id;
    delete caregiverLocal.id;

    this.isLoading = true;

    this.caregiversService
      .updateCaregiver({ id, update: caregiverLocal })
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe(
        ({ data }) => {
          const list = [...this.data];
          const updatedCaregiver: Caregiver = data.updateOneCaregiver;
          const idx = list.findIndex((car) => car.id === updatedCaregiver.id);
          list.splice(idx, 1, updatedCaregiver);
          this.data = list; // mutate reference to trigger change detection
        },
        (err) => this.errorService.handleError(err, { prefix: 'Unable to update caregiver' })
      );

    this.caregiversPatientService
      .updateCaregiversToPatient(patientCaregiverId, updateOnePatientCaregiverInput)
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe(
        ({ data }) => {
          this.getCaregivers();
          this.closeCreatePanel();
        },
        (err) => this.errorService.handleError(err, { prefix: 'Unable to update caregiver' })
      );
  }
}
