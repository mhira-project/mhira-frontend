import { Component, Input, OnInit } from '@angular/core';
import { FormattedPatient } from '@app/pages/patients-management/@types/formatted-patient';
import { Reports } from '@app/pages/administration/@types/reports';
import { finalize } from 'rxjs/operators';
import { ReportsResourcesService } from '@app/pages/patients-management/@services/reports-resources.service';
import { ErrorHandlerService } from '@shared/services/error-handler.service';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss'],
})
export class ReportsComponent implements OnInit {
  @Input() public patient: FormattedPatient;
  reports: Reports[];
  public isLoading = false;

  constructor(private errorService: ErrorHandlerService, private reportsResourcesService: ReportsResourcesService) {}

  ngOnInit(): void {
    this.getReportsByResources();
  }

  getReportsByResources() {
    this.isLoading = true;
    this.reportsResourcesService
      .getPatientCaseManagers()
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe(
        ({ data: { getReportsByResource } }: any) => {
          this.reports = getReportsByResource;
        },
        (err) => this.errorService.handleError(err, { prefix: 'Unable to load reports' })
      );
  }

  getToken() {
    const userStr = localStorage.getItem('auth_app_token');
    const user = JSON.parse(userStr);
    return user.accessToken;
  }

  generateLink(url: string) {
    url = url ? '/' + url : '';

    // '/shiny/patient-report?token=' + getToken() + '&patient_id=' + patient.id
    console.log('/shiny' + url + '?token=' + this.getToken() + '&patient_id=' + this.patient.id);
    window.open('/shiny' + url + '?token=' + this.getToken() + '&patient_id=' + this.patient.id, '_blank').focus();
  }
}
