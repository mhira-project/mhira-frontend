import { Component, OnInit } from '@angular/core';
import { Disclaimers } from '@app/pages/administration/@types/disclaimers';
import { TableColumn } from '@shared/@modules/master-data/@types/list';
import { DisclaimersColumns } from '@app/pages/administration/@tables/disclaimers.table';
import { finalize } from 'rxjs/operators';
import { DisclaimersService } from '@app/pages/administration/@services/disclaimers.service';
import { ErrorHandlerService } from '@shared/services/error-handler.service';
import { DisclaimerForm } from '../@forms/disclaimer.form';
import { Scripts } from '../../questionnaire-management/@types/scripts';
import { createLogErrorHandler } from '@angular/compiler-cli/ngcc/src/execution/tasks/completion';
import { Convert } from '../../../@shared/classes/convert';

@Component({
  selector: 'app-disclaimers',
  templateUrl: './disclaimers.component.html',
  styleUrls: ['./disclaimers.component.scss'],
})
export class DisclaimersComponent implements OnInit {
  public data: Partial<Disclaimers>[];
  public columns: TableColumn<Partial<Disclaimers>>[] = DisclaimersColumns;
  public disclaimers: Disclaimers;
  public disclaimerForm = DisclaimerForm;
  public showCancelButton = false;
  public loadingMessage = '';
  public isLoading = false;

  // form properties
  public showCreateDisclaimer = false;
  public populateForm = false;
  public resetForm = false;
  public disclaimer: Disclaimers;

  // public disclaimerForm = DisclaimerForm;

  constructor(private disclaimersService: DisclaimersService, private errorService: ErrorHandlerService) {}

  ngOnInit(): void {
    this.getDescription();
  }

  public openCreatePanel(disclaimer?: Disclaimers): void {
    if (disclaimer) {
      this.disclaimer = disclaimer;
    }
    this.showCreateDisclaimer = true;
    this.populateForm = true;
    this.resetForm = true;
  }

  public closeCreatePanel(): void {
    this.disclaimer = null;
    this.showCreateDisclaimer = false;
    this.populateForm = false;
    this.resetForm = false;
  }

  public handleRowClick(event: any) {
    this.populateForm = true;
    this.openCreatePanel(event);
  }

  public updateDisclaimer() {
    const inputValues: any = {};
    this.disclaimerForm.groups[0]?.fields?.map((field) => {
      inputValues[field.name] = field.value;
    });

    const { description } = inputValues;

    const sendResult = { type: this.disclaimer.type, description };

    return this.disclaimersService
      .updateDisclaimer(sendResult)
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe(
        ({ data }) => {
          this.data = this.data.map((disclaimer) => {
            if (disclaimer.type === data.type) {
              console.log('here');
              disclaimer.description = data.description;
              // disclaimer.updatedAt = data.updatedAt.Convert.toDisclaimer();
            }
            return disclaimer;
          });
          this.closeCreatePanel();
          this.getDescription();
        },
        (error) => this.errorService.handleError(error, { prefix: 'Unable to update disclaimer' })
      );
  }

  private getDescription(): void {
    this.isLoading = true;
    this.disclaimersService
      .disclaimers()
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe(
        ({ data }: any) => {
          console.log(data);
          this.data = data.disclaimers.map((disclaimers: any) => disclaimers);
        },
        (err) => this.errorService.handleError(err, { prefix: 'Unable to load departments' })
      );
  }
}
