import { Component, OnInit } from '@angular/core';
import { Paging } from '@shared/@types/paging';
import { Consent, UpdateOneConsentInput } from '@app/pages/administration/@types/consent';
import { ConsentsTable } from '@app/pages/administration/@tables/consents.table';
import { Sorting } from '@shared/@types/sorting';
import { Filter } from '@shared/@types/filter';
import { ConsentsService } from '@app/pages/administration/@services/consents.service';
import { ConsentForm } from '@app/pages/administration/@forms/consent.form';
import { Convert } from '@shared/classes/convert';
import { AppPermissionsService } from '@shared/services/app-permissions.service';
import { PermissionKey } from '@app/@shared/@types/permission';
import { PaginationService } from '@shared/services/pagination.service';
import { ErrorHandlerService } from '../../../@shared/services/error-handler.service';
import { finalize } from 'rxjs/operators';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ActionArgs } from '@app/@shared/@modules/master-data/@types/list';

enum ActionKey {
  DELETE,
}

@Component({
  selector: 'app-consents',
  templateUrl: './consents.component.html',
  styleUrls: ['./consents.component.scss'],
})
export class ConsentsComponent implements OnInit {
  PK = PermissionKey;
  isLoading = false;
  modalLoading = false;
  populateForm = false;
  resetForm = false;
  consents: Consent[] = [];
  paging: Paging = {
    first: 10,
  };
  pageInfo: any;
  consentsTable: { columns: any[]; rows: Consent[] } = {
    columns: ConsentsTable.columns,
    rows: [],
  };
  actions = [{ key: ActionKey.DELETE, title: 'Delete Consent' }];

  showCreateConsent = false;
  panelTitle = 'Create Consent';
  loadingMessage = '';
  consentForms = ConsentForm;
  inputMode = true;
  showCancelButton = false;
  isCreateAction = false;
  role: Consent;

  constructor(
    private consentsService: ConsentsService,
    private modalService: NzModalService,
    private message: NzMessageService,
    private errorService: ErrorHandlerService,
    public perms: AppPermissionsService,
    private paginationService: PaginationService
  ) {}

  ngOnInit(): void {
    this.getConsents();
  }

  getConsents(params?: { paging?: Paging; filter?: Filter; sorting?: Sorting }) {
    this.isLoading = true;
    this.consents = [];
    this.consentsTable.rows = [];
    this.consentsService
      .consents(params)
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe(
        ({ data }: any) => {
          console.log('data', data);
          data.consents.map((consent: any) => {
            this.consents.push(Convert.toConsent(consent));
          });
          this.consentsTable.rows = this.consents;
        },
        (error) => this.errorService.handleError(error, { prefix: 'Unable to get consents' })
      );
  }

  navigatePages(direction: 'next' | 'previous', pageSize: number = 10) {
    const paging = this.paginationService.navigatePages(this.paging, direction, pageSize);
    this.getConsents({ paging });
  }

  handleRowClick(consent: Consent) {
    this.role = consent;
    this.populateForm = true;
    this.toggleCreatePanel(false);
  }

  disableEnableFields() {
    this.consentForms.groups.forEach((group) =>
      group.fields.forEach((field) => {
        field.name === 'hierarchy' && this.perms.isSuperAdmin ? (field.disabled = true) : (field.disabled = false);
      })
    );
  }

  closeCreatePanel() {
    this.populateForm = false;
    this.resetForm = false;
    this.showCreateConsent = false;
  }

  toggleCreatePanel(create: boolean = true) {
    this.disableEnableFields();
    this.showCreateConsent = !this.showCreateConsent;
    this.isCreateAction = create;
    if (create) {
      this.role = null;
      this.resetForm = true;
    }
    this.panelTitle = !this.isCreateAction ? 'Update Consent' : 'Create Consent';
  }

  createConsent(role: Consent) {
    this.isLoading = true;
    this.populateForm = false;
    this.resetForm = false;
    this.loadingMessage = `Creating consent ${role.name}`;
    this.consentsService
      .createConsent(role)
      .pipe(
        finalize(() => {
          this.isLoading = false;
          this.loadingMessage = '';
        })
      )
      .subscribe(
        ({ data }) => {
          this.consents.push(Convert.toConsent(data.createOneConsent));
          this.consentsTable.rows = this.consents;
          this.resetForm = true;
          this.populateForm = false;
          this.toggleCreatePanel();
          this.getConsents();
          this.message.success('Consent has successfully been created');
        },
        (error) => this.errorService.handleError(error, { prefix: 'Unable to create consent' })
      );
  }

  submitForm(consentData: any) {
    if (this.isCreateAction) {
      this.createConsent(consentData);
    } else {
      consentData.id = this.role.id;
      this.updateConsent(consentData);
    }
  }

  private updateConsent(consent: Consent) {
    const updateOneConsentInput: UpdateOneConsentInput = {
      id: consent.id,
      name: consent.name,
      description: consent.description,
      consent1: consent.consent1,
      consent2: consent.consent2,
      submitContent: consent.submitContent,
    };
    this.isLoading = true;
    this.loadingMessage = `Updating consent ${consent.name}`;
    this.consentsService
      .updateConsent(updateOneConsentInput)
      .pipe(
        finalize(() => {
          this.isLoading = false;
          this.loadingMessage = '';
        })
      )
      .subscribe(
        ({ data }) => {
          const updatedConsent: Consent = Convert.toConsent(data.updateOneConsent);
          this.consents = this.consents.map((dep: Consent) => {
            if (dep.id === updatedConsent.id) {
              dep = updatedConsent;
            }
            return dep;
          });
          this.consentsTable.rows = this.consents;
          this.resetForm = true;
          this.populateForm = false;
          this.toggleCreatePanel();
          this.message.success('Consent has successfully been updated');
          this.role = null;
        },
        (error) => this.errorService.handleError(error, { prefix: `Unable to update "${consent.name}"` })
      );
  }

  public onAction({ action, context: consent }: ActionArgs<any, ActionKey>): void {
    switch (action.key) {
      case ActionKey.DELETE:
        this.deleteConsent(consent);
        return;
    }
  }

  private async deleteConsent(consent: Consent): Promise<void> {
    const modal = this.modalService.confirm({
      nzOnOk: () => true,
      nzTitle: 'Delete consent',
      nzContent: `
        Are you sure you want to delete ${consent.name}? This action is irreversible.
      `,
    });

    if (!(await modal.afterClose.toPromise())) return;

    this.isLoading = true;
    this.consentsService
      .deleteConsent(consent)
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe(
        () => {
          const data = [...this.consentsTable.rows];
          data.splice(this.consentsTable.rows.indexOf(consent), 1);
          this.consentsTable.rows = data;
        },
        (err) => this.errorService.handleError(err, { prefix: `Unable to delete consent` })
      );
  }

  public onFilter(filter: Filter): void {}
}
