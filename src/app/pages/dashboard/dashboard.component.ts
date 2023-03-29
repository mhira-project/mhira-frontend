import { Component, OnInit } from '@angular/core';
import { MhiraTranslations } from '../../@core/mhira-translations';
import { Disclaimers } from '@app/pages/administration/@types/disclaimers';
import { DisclaimersService } from '@app/pages/administration/@services/disclaimers.service';
import { finalize } from 'rxjs/operators';
import { ErrorHandlerService } from '@shared/services/error-handler.service';
import { UsersService } from '@app/pages/user-management/@services/users.service';
import { CreateUserInput, UpdateOneUserInput, User } from '@app/pages/user-management/@types/user';
import { AuthService } from '@app/auth/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  isVisible = true;
  user: User;
  public disclaimer: Disclaimers;
  public data: Partial<Disclaimers>[];
  public acceptedTerm = true;
  public isLoading = false;

  constructor(
    public translations: MhiraTranslations,
    private authService: AuthService,
    private disclaimersService: DisclaimersService,
    private errorService: ErrorHandlerService,
    private usersService: UsersService
  ) {}

  ngOnInit(): void {
    this.getUser();
    this.getDescription();
  }

  getUser() {
    this.authService.getUserProfile().subscribe(
      ({ data }) => {
        this.user = data.getUserProfile;
        this.acceptedTerm = this.user.acceptedTerm;
      },
      (err) => this.errorService.handleError(err, { prefix: 'Unable to get user profile' })
    );
  }

  updateUser() {
    const userInput: UpdateOneUserInput = {
      id: this.user.id,
      update: { acceptedTerm: true },
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
        async ({ data }) => {
          this.user = data.updateUserAcceptedTerm;
          this.acceptedTerm = this.user.acceptedTerm;
        },
        (error) => {
          this.errorService.handleError(error, {});
        }
      );
  }

  private getDescription(): void {
    this.disclaimersService
      .disclaimers()
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe(
        ({ data }: any) => {
          this.disclaimer = data.disclaimers.find((disclaimers: any) => disclaimers.type === 'loginDisclaimer');
        },
        (err) => this.errorService.handleError(err, { prefix: 'Unable to load disclaimers' })
      );
  }
}
