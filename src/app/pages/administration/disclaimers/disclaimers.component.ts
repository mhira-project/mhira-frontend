import { Component, OnInit } from '@angular/core';
import { Disclaimers } from '@app/pages/administration/@types/disclaimers';
import { TableColumn } from '@shared/@modules/master-data/@types/list';
import { DisclaimersColumns } from '@app/pages/administration/@tables/disclaimers.table';
import { finalize } from 'rxjs/operators';
import { DisclaimersService } from '@app/pages/administration/@services/disclaimers.service';
import { ErrorHandlerService } from '@shared/services/error-handler.service';
import { DisclaimerForm } from '../@forms/disclaimer.form';
import { Convert } from '../../../@shared/classes/convert';
import { UpdateOneUserInput, User } from '@app/pages/user-management/@types/user';
import { UsersService } from '@app/pages/user-management/@services/users.service';
import { AuthService } from '@app/auth/auth.service';

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
  public acceptedTerm = true;
  user: User;

  // form properties
  public showCreateDisclaimer = false;
  public populateForm = false;
  public resetForm = false;
  public disclaimer: Disclaimers;

  // public disclaimerForm = DisclaimerForm;

  constructor(
    private disclaimersService: DisclaimersService,
    private errorService: ErrorHandlerService,
    private authService: AuthService,
    private usersService: UsersService
  ) {}

  ngOnInit(): void {
    this.getDisclaimers();
    this.getUser();
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

  getUser() {
    this.authService.getUserProfile().subscribe(
      ({ data }) => {
        this.user = data.getUserProfile;
      },
      (err) => this.errorService.handleError(err, { prefix: 'Unable to get user profile' })
    );
  }

  updateUser() {
    const userInput: UpdateOneUserInput = {
      id: this.user.id,
      update: { acceptedTerm: false },
    };
    this.isLoading = true;
    this.usersService
      .updateUserAcceptedTerm(userInput)
      .pipe(
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe(
        async ({ data }) => {},
        (error) => {
          this.errorService.handleError(error, {});
        }
      );
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
          if (this.disclaimer.type === 'loginDisclaimer') {
            this.updateUser();
          }
          this.closeCreatePanel();
          this.getDisclaimers();
        },
        (error) => this.errorService.handleError(error, { prefix: 'Unable to update disclaimer' })
      );
  }

  private getDisclaimers(): void {
    this.isLoading = true;
    this.disclaimersService
      .disclaimers()
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe(
        ({ data }: any) => {
          console.log(data);
          this.data = data.disclaimers.map((disclaimers: any) => Convert.toFormattedDisclaimer(disclaimers));
        },
        (err) => this.errorService.handleError(err, { prefix: 'Unable to load departments' })
      );
  }
}
