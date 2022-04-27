import { Component, OnInit } from '@angular/core';
import { MhiraTranslations } from '../../@core/mhira-translations';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Disclaimers } from '@app/pages/administration/@types/disclaimers';
import { DisclaimersService } from '@app/pages/administration/@services/disclaimers.service';
import { finalize } from 'rxjs/operators';
import { ErrorHandlerService } from '@shared/services/error-handler.service';
import { UsersService } from '@app/pages/user-management/@services/users.service';
import { CreateUserInput, UpdateOneUserInput, User } from '@app/pages/user-management/@types/user';
import { UserModel } from '@app/pages/user-management/@models/user.model';

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
  public acceptedTerm = false;
  public isLoading = false;
  public modalClassName = 'welcome-modal';

  constructor(
    public translations: MhiraTranslations,
    private disclaimersService: DisclaimersService,
    private errorService: ErrorHandlerService,
    private usersService: UsersService,
    private modal: NzModalService
  ) {}

  ngOnInit(): void {
    this.getDescription();
    this.getUserAcceptedTerm();
  }

  getUserAcceptedTerm() {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      this.user = user;
      this.acceptedTerm = user.acceptedTerm;
    }
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
          console.log(data);
          this.disclaimer = data.disclaimers.find((disclaimers: any) => disclaimers.type === 'loginDisclaimer');
        },
        (err) => this.errorService.handleError(err, { prefix: 'Unable to load disclaimers' })
      );
  }
}
