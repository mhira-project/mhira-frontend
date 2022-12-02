import { Component, Input, OnInit } from '@angular/core';
import { PermissionKey } from '@shared/@types/permission';
import {
  Action,
  ActionArgs,
  DEFAULT_PAGE_SIZE,
  SortField,
  TableColumn,
} from '@shared/@modules/master-data/@types/list';
import { CaregiverTable } from '../@tables/contact.table';
import { CaregiverForm } from '../@forms/contacts.form';
import { PageInfo, Paging } from '@shared/@types/paging';
import { Filter } from '@shared/@types/filter';
import { finalize } from 'rxjs/operators';
import { Sorting } from '@shared/@types/sorting';
import { AppPermissionsService } from '@shared/services/app-permissions.service';
import { CaregiversService } from '@app/pages/patients-management/@services/caregivers.service';
import {
  Caregiver,
  FormattedCaregiver,
  PatientRelation,
  UpdateOneCaregiverInput,
} from '@app/pages/patients-management/@types/caregiver';
import { ErrorHandlerService } from '@shared/services/error-handler.service';
import { NzModalService } from 'ng-zorro-antd/modal';

enum ActionKey {
  DELETE_CAREGIVER,
}

@Component({
  selector: 'app-caregiver-list',
  templateUrl: './caregiver-list.component.html',
  styleUrls: ['./caregiver-list.component.scss'],
})
export class CaregiverListComponent implements OnInit {
  @Input() public caregivers: Caregiver[] = [];

  public PK = PermissionKey;
  public data: Partial<Caregiver>[];
  public columns: TableColumn<Partial<Caregiver>>[] = CaregiverTable as TableColumn<Partial<Caregiver>>[];

  // form properties
  public showCreateCaregiver = false;
  public populateForm = false;
  public resetForm = false;
  public caregiver: Caregiver;
  public caregiverForm = CaregiverForm;

  public actions: Action<ActionKey>[] = [];

  public caregiverRequestOptions: { paging: Paging; filter: Filter; sorting: Sorting[] } = {
    paging: { first: DEFAULT_PAGE_SIZE },
    filter: {},
    sorting: [],
  };

  public pageInfo: PageInfo;
  public end = false;
  public isLoading = false;

  constructor(
    private caregiversService: CaregiversService,
    public perms: AppPermissionsService,
    private errorService: ErrorHandlerService,
    private modalService: NzModalService
  ) {}

  ngOnInit(): void {
    this.getCaregiver();
    if (this.perms.permissionsOnly(PermissionKey.MANAGE_PATIENTS)) {
      this.actions = [{ key: ActionKey.DELETE_CAREGIVER, title: 'Delete Caregiver' }];
    }
  }

  public onPageChange(paging: Paging): void {
    this.caregiverRequestOptions.paging = paging;
    this.getCaregiver();
  }

  public onSort(sorting: SortField<Caregiver>[]): void {
    this.caregiverRequestOptions.sorting = sorting;
    this.getCaregiver();
  }

  public onFilter(filter: Filter): void {
    this.caregiverRequestOptions.filter = filter;
    this.getCaregiver();
  }

  public onSearch(searchString: string): void {
    this.caregiverRequestOptions.filter = { or: this.createSearchFilter(searchString) };
    this.getCaregiver();
  }

  public openCreatePanel(caregiver?: Caregiver): void {
    if (caregiver) {
      this.caregiver = caregiver;
    }
    console.log(this.caregiver);
    this.showCreateCaregiver = true;
    this.populateForm = true;
    this.resetForm = true;
    if (this.perms.permissionsOnly(PermissionKey.MANAGE_PATIENTS)) {
      this.actions = [{ key: ActionKey.DELETE_CAREGIVER, title: 'Delete Caregiver' }];
    }
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
      this.updateCaregiver(caregiver);
    } else {
      this.createCaregiver(caregiver);
    }
  }

  public onAction({ action, context: caregiver }: ActionArgs<FormattedCaregiver, ActionKey>): void {
    switch (action.key) {
      case ActionKey.DELETE_CAREGIVER:
        this.deleteCaregiver(caregiver);
        return;
    }
  }

  public onAction1(context: PatientRelation): void {
    this.deleteCaregiverPatient(context);
  }

  public handleRowClick(event: any) {
    if (!this.perms.permissionsOnly([PermissionKey.MANAGE_PATIENTS])) return;
    this.populateForm = true;
    this.openCreatePanel(event);
  }

  private getCaregiver(getAllCaregivers: boolean = false): void {
    this.isLoading = true;
    this.caregiversService
      .caregivers(this.caregiverRequestOptions)
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe((response) => {
        if (getAllCaregivers) {
          this.caregivers = response.data.caregivers?.edges.map((e: any) => e.node);
        } else {
          this.data = response.data.caregivers?.edges.map((e: any) => e.node);
        }
        this.pageInfo = response.data.caregivers?.pageInfo; // TODO: remove
      });
  }

  private createSearchFilter(searchString: string): Array<{ [K in keyof Partial<FormattedCaregiver>]: {} }> {
    if (!searchString) return [];
    return [{ firstName: { iLike: `%${searchString}%` } }, { lastName: { iLike: `%${searchString}%` } }];
  }

  private async deleteCaregiver(caregiver: FormattedCaregiver): Promise<void> {
    const modal = this.modalService.confirm({
      nzOnOk: () => true,
      nzTitle: 'Delete caregiver',
      nzContent: `
        Are you sure you want to delete ${caregiver.firstName}? This action is irreversible.
      `,
    });

    if (!(await modal.afterClose.toPromise())) return;

    this.isLoading = true;
    this.caregiversService
      .deleteCaregiver(caregiver)
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe(
        () => {
          const data = [...this.data];
          data.splice(this.data.indexOf(caregiver), 1);
          this.data = data; // mutate reference to trigger change detection
        },
        (err) => this.errorService.handleError(err, { prefix: `Unable to delete caregiver "${caregiver.firstName}"` })
      );
  }

  private async deleteCaregiverPatient(patientRelation: PatientRelation): Promise<void> {
    const modal = this.modalService.confirm({
      nzOnOk: () => true,
      nzTitle: 'Delete relation',
      nzContent: `
        Are you sure you want to remove this caregiver for the patient?
      `,
    });

    if (!(await modal.afterClose.toPromise())) return;

    this.isLoading = true;
    this.caregiversService
      .deleteCaregiverPatient(patientRelation.id)
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe(
        () => {
          this.caregiver.patientCaregivers = this.caregiver.patientCaregivers.filter(
            (relation) => relation.id !== patientRelation.id
          );
        },
        (err) =>
          this.errorService.handleError(err, { prefix: `Unable to delete relation "${patientRelation.relation}"` })
      );
  }

  private createCaregiver(caregiver: Caregiver): void {
    this.isLoading = true;
    this.populateForm = false;
    this.resetForm = false;
    this.caregiversService
      .createCaregiver(caregiver)
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe(
        ({ data }) => {
          // mutate reference to trigger change detection
          this.data = [...this.data, data.createOneCaregiver];
          this.closeCreatePanel();
          this.getCaregiver();
        },
        (err) => this.errorService.handleError(err, { prefix: 'Unable to create Caregiver' })
      );
  }

  private updateCaregiver(caregiver: Caregiver): void {
    const caregiverLocal = JSON.parse(JSON.stringify(caregiver));
    const id = caregiverLocal.id;
    delete caregiverLocal.id;
    const updateOneCaregiverInput: UpdateOneCaregiverInput = {
      id,
      update: caregiverLocal,
    };
    this.isLoading = true;
    this.caregiversService
      .updateCaregiver(updateOneCaregiverInput)
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe(
        ({ data }) => {
          const list = [...this.data];
          const updatedCaregiver: Caregiver = data.updateOneCaregiver;
          const idx = list.findIndex((car) => car.id === updatedCaregiver.id);
          list.splice(idx, 1, updatedCaregiver);
          this.data = list; // mutate reference to trigger change detection
          this.closeCreatePanel();
        },
        (err) => this.errorService.handleError(err, { prefix: 'Unable to update caregiver' })
      );
  }
}
