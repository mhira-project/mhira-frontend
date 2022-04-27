import { Component, OnInit } from '@angular/core';
import { MhiraTranslations } from '../../@core/mhira-translations';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Disclaimers } from '@app/pages/administration/@types/disclaimers';
import { DisclaimersService } from '@app/pages/administration/@services/disclaimers.service';
import { finalize } from 'rxjs/operators';
import { ErrorHandlerService } from '@shared/services/error-handler.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  isVisible = true;
  public disclaimer: Disclaimers;
  public data: Partial<Disclaimers>[];
  public isLoading = false;
  public modalClassName = 'welcome-modal';

  constructor(
    public translations: MhiraTranslations,
    private disclaimersService: DisclaimersService,
    private errorService: ErrorHandlerService,
    private modal: NzModalService
  ) {}

  ngOnInit(): void {
    this.getDescription();
    console.log(this.disclaimer);
  }

  handleOk(): void {
    console.log('Button ok clicked!');
    this.isVisible = false;
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
