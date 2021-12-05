import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Contact } from '@app/pages/patients-management/@types/contact';
import { finalize } from 'rxjs/operators';
import { EmergencyContactsService } from '@app/pages/patients-management/@services/contacts.service';
import { ErrorHandlerService } from '@shared/services/error-handler.service';
import { AppPermissionsService } from '@shared/services/app-permissions.service';
import { PermissionKey } from '@shared/@types/permission';
import { FormattedPatient } from '@app/pages/patients-management/@types/formatted-patient';
import { TableColumn, Action, ActionArgs, DEFAULT_PAGE_SIZE } from '@shared/@modules/master-data/@types/list';
import { PageInfo, Paging } from '@shared/@types/paging';
import { Filter } from '@shared/@types/filter';
import { NzModalService } from 'ng-zorro-antd/modal';
import { SelectModalComponent } from '@shared/components/select-modal/select-modal.component';
import { ContactColumns } from '@app/pages/patients-management/@tables/contact.table';
import { EmergencyContactForm } from '@app/pages/patients-management/@forms/contacts.form';
import { Informant } from '@app/pages/patients-management/@types/informant';
import { InformantModel } from '@app/pages/patients-management/@models/informant-model';

enum ActionKey {
  REMOVE_CONTACT,
  ADD_CONTACT,
}

@Component({
  selector: 'app-emergency-contact',
  templateUrl: './emergency-contact.component.html',
  styleUrls: ['./emergency-contact.component.scss'],
})
export class EmergencyContactComponent implements OnInit {
  PK = PermissionKey;
  ActionKey = ActionKey;
  @Input() public patient: FormattedPatient;

  @Input() public contacts: Contact[] = [];

  @Output() patientContactsUpdated: EventEmitter<any> = new EventEmitter<any>();

  public columns: TableColumn<Partial<Contact>>[] = ContactColumns as TableColumn<Partial<Contact>>[];

  public data: Partial<Contact>[];

  public pageInfo: PageInfo;

  public loading = false;

  public end = false;

  public contactRequestOptions: {
    paging: Paging;
    filter: Filter;
    // sorting: Sorting[];
  } = {
    paging: { first: DEFAULT_PAGE_SIZE },
    filter: {},
    // sorting: []
  };

  public actions: Action<ActionKey>[] = [];

  isLoading = false;
  populateForm = false;
  resetForm = false;
  loadingMessage = '';
  showCancelButton = false;
  // patients: Patient;
  inputMode = true;

  constructor(
    private emergencyContactsService: EmergencyContactsService,
    private modalService: NzModalService,
    // private message: NzMessageService,
    private errorService: ErrorHandlerService,
    // private router: Router,
    public perms: AppPermissionsService
  ) {}

  ngOnInit(): void {
    this.getContact();
    if (this.contacts.length === 0) {
      this.getContact(true);
    }
    this.getContact();
  }

  public searchContact(searchString: string): void {
    this.contactRequestOptions.filter = {
      or: this.createSearchFilter(searchString),
    };
    this.getContact();
  }

  public onPageChange(paging: Paging): void {
    this.contactRequestOptions.paging = paging;
    this.getContact();
  }

  // public onSort(sorting: SortField<Contact>[]): void {
  //   this.contactRequestOptions.sorting = sorting;
  //   this.getContact();
  // }

  public onFilter(filter: Filter): void {
    this.contactRequestOptions.filter = filter;
    this.getContact();
  }

  public onAction({ action, context: contact }: ActionArgs<Contact, ActionKey>): void {
    switch (action.key) {
      case ActionKey.REMOVE_CONTACT:
        this.managePatientContacts(ActionKey.REMOVE_CONTACT, contact);
        return;
    }
  }

  public async updatePatientContact(action: ActionKey, selectedContact?: Contact): Promise<void> {
    const modal = this.modalService.create<SelectModalComponent<Contact>>({
      nzTitle: `Add emergency contact to ${this.patient?.firstName} ${this.patient?.lastName}`,
      nzContent: SelectModalComponent,
      nzComponentParams: {
        options: this.contacts,
        titleField: 'firstName',
      },
      nzOnOk: (m) => m.selected,
    });

    const state: Contact = await modal.afterClose.toPromise();

    const contactId = selectedContact ? selectedContact.id : state.id;
    const contact = selectedContact
      ? selectedContact
      : this.contacts[this.contacts.findIndex((p) => p.id === contactId)];
    this.managePatientContacts(action, contact);
  }

  private getContact(getAllContacts: boolean = false): void {
    this.loading = true;
    const options = { ...this.contactRequestOptions };

    options.filter = {
      ...options.filter,
      and: [getAllContacts ? {} : { patients: { id: { eq: this.patient?.id } } }, ...(options.filter.and ?? [])],
    };

    this.emergencyContactsService
      .emergencyContacts(options)
      .pipe(finalize(() => (this.loading = false)))
      .subscribe((response) => {
        if (getAllContacts) {
          this.contacts = response.data.contacts?.edges.map((e: any) => e.node);
        } else {
          this.data = response.data.contacts?.edges.map((e: any) => e.node);
        }
        this.pageInfo = response.data.contacts?.pageInfo; // TODO: remove
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

  private managePatientContacts(action: ActionKey, contact: Contact) {
    this.loading = true;
    const executedAction =
      action === ActionKey.ADD_CONTACT
        ? this.emergencyContactsService.addEmergencyContactsToPatient(this.patient.id, [contact.id])
        : this.emergencyContactsService.removeEmergencyContactsFromPatient(this.patient.id, [contact.id]);
    executedAction.pipe(finalize(() => (this.loading = false))).subscribe(
      () => {
        if (action === ActionKey.ADD_CONTACT) {
          // mutate reference to trigger change detection
          this.data = [contact, ...this.data];
        } else {
          const list = [...this.data];
          list.splice(
            list.findIndex((p) => p.id === contact.id),
            1
          );
          this.data = list; // mutate reference to trigger change detection
        }
        this.patientContactsUpdated.emit({
          action,
          contacts: this.data,
        });
      },
      (error) => this.errorService.handleError(error, { prefix: 'Unable to update department on patient' })
    );
  }

  private setActions(): void {
    if (this.perms.permissionsOnly(PermissionKey.MANAGE_PATIENTS)) {
      this.actions = [
        ...this.actions,
        {
          key: ActionKey.REMOVE_CONTACT,
          title: 'Remove contact from Patient.',
        },
      ];
    }
  }
  // createInformant(contact: Informant) {
  //   this.isLoading = true;
  //   this.hasErrors = false;
  //   this.errors = [];
  //   this.loadingMessage = `Creating informant ${informant.firstName}`;
  //   this.informantsService.createInformant(informant).subscribe(
  //     async ({ data }) => {
  //       this.informants.unshift(InformantModel.fromJson(data.createOneInformant));
  //       this.informantsTable.rows = this.informants;
  //       this.isLoading = false;
  //       this.loadingMessage = '';
  //       this.toggleCreatePanel();
  //       this.message.create('success', `Informant has successfully been created`);
  //     },
  //     (error) => {
  //       this.hasErrors = true;
  //       this.errors = error.graphQLErrors.map((x: { message: string }) => x.message);
  //       this.isLoading = false;
  //       this.loadingMessage = '';
  //     }
  //   );
  // }
  //
  // updateInformant(informant: Informant) {
  //   this.isLoading = true;
  //
  //   this.informantsService.updateInformant(informant).subscribe(
  //     ({ data }) => {
  //       const newInformant = data.updateOneInformant;
  //       this.informants[this.selectedIndex] = InformantModel.fromJson(newInformant);
  //       this.isLoading = false;
  //       this.toggleCreatePanel();
  //       this.message.success('Informant has been successfully edited', {
  //         nzDuration: 3000,
  //       });
  //     },
  //     (error) => {
  //       this.errors = error.graphQLErrors.map((x: { message: string }) => x.message);
  //       this.isLoading = false;
  //     }
  //   );
  // }
  //
  // deleteInformant(informant: Informant) {
  //   this.modalLoading = true;
  //   this.informantsService.deleteInformant(informant).subscribe(
  //     async ({ data }: any) => {
  //       this.informants.splice(this.selectedIndex, 1);
  //       this.modalLoading = false;
  //       this.message.create('success', `informant has been successfully deleted`);
  //     },
  //     (error: any) => {
  //       this.modalLoading = false;
  //       this.message.create('error', `could not remove informant for ${informant.firstName}`);
  //     }
  //   );
  // }
  //
  // submitForm(informant: Informant) {
  //   if (this.isCreateAction) {
  //     this.createInformant(informant);
  //   } else {
  //     informant.id = this.informants[this.selectedIndex].id;
  //     this.updateInformant(informant);
  //   }
  // }
}
