import { Component, Input, OnInit } from '@angular/core';
import { Caregiver } from '@app/pages/patients-management/@types/caregiver';
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
import { CaregiverForm } from '@app/pages/patients-management/@forms/contacts.form';
import { AppPermissionsService } from '@shared/services/app-permissions.service';
import { FormGroup } from '@angular/forms';
enum ActionKey {
  EDIT_CAREGIVER,
  DELETE_CAREGIVER,
}

@Component({
  selector: 'app-caregivers-patient',
  templateUrl: './caregivers-patient.component.html',
  styleUrls: ['./caregivers-patient.component.scss'],
})
export class CaregiversPatientComponent implements OnInit {
  @Input() public patient: FormattedPatient;
  @Input() public caregivers: Caregiver[] = [];
  public PK = PermissionKey;
  public data: Partial<Caregiver>[];
  public columns: TableColumn<Partial<Caregiver>>[] = CaregiversPatientTable as TableColumn<Partial<Caregiver>>[];
  public addCaregiverForm: FormGroup;
  public editMode = true;
  public selectedCaregiver: Caregiver;

  // form properties
  public showCreateCaregiver = false;
  public populateForm = false;
  public resetForm = false;
  public caregiver: Caregiver;
  public caregiverForm = CaregiverForm;

  public caregiverRequestOptions: { paging: Paging; filter: Filter; sorting: Sorting[] } = {
    paging: { first: DEFAULT_PAGE_SIZE },
    filter: {},
    sorting: [],
  };

  public pageInfo: PageInfo;
  public end = false;
  public isLoading = false;
  public actions: Action<ActionKey>[] = [];

  constructor(private caregiversPatientService: CaregiversPatientService, public perms: AppPermissionsService) {}

  ngOnInit(): void {
    this.getCaregivers();
  }
  public onPatientSelect(caregiver: Caregiver) {
    this.addCaregiverForm.patchValue({ caregiverPhone: caregiver?.phone });
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

  public openCreatePanel(caregiver?: Caregiver): void {
    console.log(caregiver);
    if (caregiver) this.caregiver = caregiver;
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

  // public onAction({ action, context: department }: ActionArgs<Department, ActionKey>): void {
  //   switch (action.key) {
  //     case ActionKey.REMOVE_DEPARTMENT:
  //       this.managePatientCaregivers(ActionKey.REMOVE_DEPARTMENT, department);
  //       return;
  //   }
  // }

  private getCaregivers(getAllCaregivers: boolean = false): void {
    this.isLoading = true;
    const options = { ...this.caregiverRequestOptions };

    options.filter = {
      ...options.filter,
      and: [getAllCaregivers ? {} : { patients: { id: { eq: this.patient?.id } } }, ...(options.filter.and ?? [])],
    };

    this.caregiversPatientService
      .caregiversPatient(options)
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe((response) => {
        if (getAllCaregivers) {
          this.caregivers = response.data.caregivers.edges.map((e: any) => e.node);
        } else {
          this.data = response.data.caregivers.edges.map((e: any) => e.node);
        }
        this.pageInfo = response.data.caregivers.pageInfo; // TODO: remove
      });
  }

  private createSearchFilter(searchString: string) {
    if (!searchString) return [];
    return [
      { name: { iLike: `%${searchString}%` } },
      { description: { iLike: `%${searchString}%` } },
      {
        patients: {
          or: [
            { firstName: { iLike: `%${searchString}%` } },
            { middleName: { iLike: `%${searchString}%` } },
            { lastName: { iLike: `%${searchString}%` } },
          ],
        },
      },
    ];
  }
}
