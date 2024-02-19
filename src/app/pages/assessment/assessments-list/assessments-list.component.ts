import {Component} from '@angular/core';
import {AssessmentService} from '@app/pages/assessment/@services/assessment.service';
import {Router} from '@angular/router';
import {environment} from '@env/environment';
import {Paging} from '@shared/@types/paging';
import {Sorting} from '@shared/@types/sorting';
import {AppPermissionsService} from '@shared/services/app-permissions.service';
import {PermissionKey} from '@app/@shared/@types/permission';
import {
    TableColumn,
    Action,
    DEFAULT_PAGE_SIZE,
    SortField,
    ActionArgs
} from '../../../@shared/@modules/master-data/@types/list';
import {FormattedAssessment} from '../@types/assessment';
import {AssessmentTable} from '../@tables/assessment.table';
import {Convert} from '../../../@shared/classes/convert';
import {PageInfo} from '../../../@shared/@types/paging';
import {finalize} from 'rxjs/operators';
import {Filter} from '../../../@shared/@types/filter';
import {ErrorHandlerService} from '../../../@shared/services/error-handler.service';
import {User} from '@app/pages/user-management/@types/user';
import {NzModalService} from 'ng-zorro-antd/modal';
import {ClipboardService} from 'ngx-clipboard';
import {NzMessageService} from 'ng-zorro-antd/message';
import {LocationStrategy} from '@angular/common';

const CryptoJS = require('crypto-js');

enum ActionKey {
    SHOW_ASSESSMENT,
    COPY_ASSESSMENT_LINK,
    ARCHIVE_ASSESSMENT,
    CANCEL_SESSION,
    DELETE_ASSESSMENT,
    SENT_EMAIL,
    SCAN_QR_CODE,
    RESTORE_ASSESSMENT
}

@Component({selector: 'app-planned-assessment', templateUrl: './assessments-list.component.html', styleUrls: ['./assessments-list.component.scss']})
export class AssessmentsListComponent {
    PK = PermissionKey;
    public columns : TableColumn < FormattedAssessment > [] = AssessmentTable;
    public data : FormattedAssessment[];
    public currentFilters = false;
    public cacheFilters = JSON.parse(localStorage.getItem('filter'));
    public pageInfo : PageInfo;
    public loading = false;
    public actions : Action < ActionKey > [] = [
        {
            key: ActionKey.SHOW_ASSESSMENT,
            title: 'Start Session'
        }, {
            key: ActionKey.COPY_ASSESSMENT_LINK,
            title: 'Copy Session Link'
        }, {
            key: ActionKey.SCAN_QR_CODE,
            title: 'Scan QR Code'
        },
    ];
    public onlyMyAssessments = (localStorage.getItem('onlyMyAssessments') === 'true');
    public onlyArchivedAssessments = (localStorage.getItem('onlyArchivedAssessments') === 'true');
    isVisible = false;
    modalData : any = '';
    statusFilter = '';

    public assessmentRequestOptions : {
        paging: Paging;
        filter: Filter;
        sorting: Sorting[]
    } = {
        paging: {
            first: DEFAULT_PAGE_SIZE
        },
        filter: {},
        sorting: []
    };
    newUrl : URL;

    // tslint:disable
    constructor(private assessmentService : AssessmentService, private router : Router, private modalService : NzModalService, private errorService : ErrorHandlerService, private clipboardService : ClipboardService, private messageService : NzMessageService, private locationStrategy : LocationStrategy, public perms : AppPermissionsService) {
        this.getAssessments();

        if (this.perms.permissionsOnly(PermissionKey.MANAGE_ASSESSMENTS)) {
            this.actions.push({key: ActionKey.CANCEL_SESSION, title: 'Cancel Session'});
            this.actions.push({key: ActionKey.RESTORE_ASSESSMENT, title: 'Restore Assessment'});
            this.actions.push({key: ActionKey.ARCHIVE_ASSESSMENT, title: 'Archive Assessment'});
        }
        if (this.perms.permissionsOnly(PermissionKey.DELETE_ASSESSMENTS)) {
            this.actions.push({key: ActionKey.DELETE_ASSESSMENT, title: 'Delete Session'});
        }
        if(environment.email){
            this.actions.push({key: ActionKey.SENT_EMAIL, title: 'Send Email'});
        }

        if(!localStorage.getItem('onlyMyAssessments')){
            localStorage.setItem('onlyMyAssessments', this.onlyMyAssessments.toString());
        }
        if(!localStorage.getItem('onlyArchivedAssessments')){
            localStorage.setItem('onlyArchivedAssessments', this.onlyArchivedAssessments.toString());
        }
        // if(!localStorage.getItem('paging')){
        //     localStorage.setItem('paging', JSON.stringify(this.assessmentRequestOptions.paging));
        // }
        if(!localStorage.getItem('filter')){
            localStorage.setItem('filter', JSON.stringify(this.assessmentRequestOptions.filter));
        }
        if(!localStorage.getItem('sorting')){
            localStorage.setItem('sorting', JSON.stringify(this.assessmentRequestOptions.sorting));
        }
    }

    showModal(): void {
        this.isVisible = true;
    }

    handleOk(): void {
        this.isVisible = false;
    }

    handleCancel(): void {
        this.isVisible = false;
    }

    public onPageChange(paging : Paging): void {
        this.assessmentRequestOptions.paging = paging;
        // localStorage.setItem('paging', JSON.stringify(this.assessmentRequestOptions.paging));
        this.getAssessments();
    }

    public onSort(sorting : SortField < FormattedAssessment > []): void {
        this.assessmentRequestOptions.sorting = sorting;
        this.getAssessments();
    }

    public onFilter(filter : Filter): void {
        this.assessmentRequestOptions.filter = filter;
        localStorage.setItem('filter', JSON.stringify(this.assessmentRequestOptions.filter));
        this.getAssessments();
        this.currentFilters = true;
    }

    public onSearch(searchString : string): void {
        this.assessmentRequestOptions.filter = {
            or: this.createSearchFilter(searchString)
        };
        this.getAssessments();
    }

    public onStatusSelect(): any{
        if(this.assessmentRequestOptions.filter.and) {
            const filters = {...this.assessmentRequestOptions.filter, and: [...this.assessmentRequestOptions.filter.and, {status: {eq: this.statusFilter}}]};
        } else {
            const filters = {...this.assessmentRequestOptions.filter, and: [{status: {eq: this.statusFilter}}]};
        }
        this.getAssessments();
        this.currentFilters = true;
    }

    public onAction({action, context: assessment} : ActionArgs < FormattedAssessment, ActionKey >): void {
        switch (action.key) {
            case ActionKey.SHOW_ASSESSMENT:
                this.showAssessment(assessment);
                return;
            case ActionKey.COPY_ASSESSMENT_LINK:
                this.copyAssessmentLink(assessment);
                return;
            case ActionKey.ARCHIVE_ASSESSMENT:
                this.archiveAssessment(assessment);
                return;
            case ActionKey.RESTORE_ASSESSMENT:
                this.restoreAssessment(assessment);
                return;    
            case ActionKey.DELETE_ASSESSMENT:
                this.deleteAssessment(assessment, false);
                return;
            case ActionKey.CANCEL_SESSION:
                this.deleteAssessment(assessment, true);
                return;
            case ActionKey.SENT_EMAIL:
                this.sendAssessmentEmail(assessment);
                return;        
            case ActionKey.SCAN_QR_CODE:
                this.modalData = assessment
                this.newUrl = new URL(this.generateAssessmentURL(assessment.uuid), window.location.origin);
                this.showModal()
                return;
        }
    }

    public onAssessmentSelect(assessment : FormattedAssessment): void {
        const dataString = CryptoJS.AES.encrypt(JSON.stringify(assessment), environment.secretKey).toString();
        this.router.navigate(['/mhira/assessments/plan-assessments'], {
            queryParams: {
                assessment: dataString
            }
        });
    }

    public onMyAssessments(): void {
        if(this.onlyMyAssessments === true){
           localStorage.setItem('onlyMyAssessments', 'false');
           this.onlyMyAssessments = false;
        }
        else{
           localStorage.setItem('onlyMyAssessments', 'true');
           this.onlyMyAssessments = true;
        }
        this.getAssessments();
    }

    public onArchivedAssessments(): void {
      if(this.onlyArchivedAssessments === true){
        localStorage.setItem('onlyArchivedAssessments', 'false');
        this.onlyArchivedAssessments = false;
      }
      else{
        localStorage.setItem('onlyArchivedAssessments', 'true');
        this.onlyArchivedAssessments = true;
      }
      this.getAssessments();
    }

    private getAssessments(): void { // copy to not modify original options
        const options = {
            ...this.assessmentRequestOptions
        };

        if(localStorage.getItem('filter')){
            options.filter = {...options.filter, ...JSON.parse(localStorage.getItem('filter'))}
        }

        if(options.sorting.length === 0){
            options.sorting.push({field: 'createdAt', direction: 'DESC'})
        }

        if(!this.onlyArchivedAssessments){
            options.filter = {
              ...options.filter,
              and: [{ deleted: {is: false} }, ...(options.filter.and ?? [])],
            };
          }  

        // apply for only my patients
        if (this.onlyMyAssessments) 
            options.filter = {
                ... options.filter,
                and: [
                    {
                        clinician: {
                            id: {
                                eq: this.userId
                            }
                        }
                    },
                    ...(options.filter.and ?? [])
                ]
            };

        // apply for archived assessments
        if (this.onlyArchivedAssessments){
            options.filter = {
                ...options.filter,
                and: [{ deleted: {is: true} }, ...(options.filter.and ?? [])],
            };
        }
        
        // apply for assessment status
        if(this.statusFilter) {
            options.filter = {...options.filter, and: [...options.filter.and, {status: {eq: this.statusFilter}}]}
        }
        this.loading = true;
        this.assessmentService.getAssessments(options).pipe(finalize(() => (this.loading = false))).subscribe(({edges, pageInfo}) => {
            this.data = edges.map((e : any) => Convert.toFormattedAssessment(e.node));
            this.pageInfo = pageInfo;
        }, (error) => this.errorService.handleError(error, {prefix: 'Unable to load assessments'}));
    }

    private async deleteAssessment(assessment : FormattedAssessment, statusCancel : boolean): Promise < void > { // create confirmation modal
        const modal = this.modalService.confirm(
            {
                nzOnOk: () => true,
                nzTitle: 'Delete Assessment',
                nzContent: `
        Are you sure you want to delete ${
                    assessment.name
                }? This action is irreversible
      `
            }
        );

        // wait for modal to successfully complete
        const confirmation = await modal.afterClose.toPromise();
        if (! confirmation) 
            return;
        

        this.loading = true;
        this.assessmentService.deleteAssessment(assessment, statusCancel).pipe(finalize(() => (this.loading = false))).subscribe((archived) => {
            if (!archived) {
                this.getAssessments();
            } else {
                this.getAssessments();
            }
        }, (error) => this.errorService.handleError(error, {prefix: `Unable to delete assessment "${
                assessment.name
            }"`}));
    }

    private async archiveAssessment(assessment : FormattedAssessment) {
        const modal = this.modalService.confirm({
            nzOnOk: () => true,
            nzTitle: 'Archive Assessment',
            nzContent: `
            Are you sure you want to archive ${
                assessment.name
            }?`
        });

        const confirmation = await modal.afterClose.toPromise();
        if (! confirmation) 
            return;
        

        this.loading = true;
        this.assessmentService.archiveAssessment(assessment).pipe(finalize(() => (this.loading = false))).subscribe((archived) => {
            if (!archived) {
                this.getAssessments();
            } else {
                this.getAssessments();
            }
        }, (error) => this.errorService.handleError(error, {prefix: `Unable to archive assessment "${
                assessment.name
            }"`}));
    }

    private async restoreAssessment(assessment : FormattedAssessment) {
        const modal = this.modalService.confirm({
            nzOnOk: () => true,
            nzTitle: 'Restore Assessment',
            nzContent: `
            Are you sure you want to restore ${
                assessment?.name
            }?`
        });

        const confirmation = await modal.afterClose.toPromise();
        if (! confirmation) 
            return;
        

        this.loading = true;
        this.assessmentService.restoreAssessment(assessment).pipe(finalize(() => (this.loading = false))).subscribe((archived) => {
            if (!archived) {
                this.getAssessments();
            } else {
                this.getAssessments();
            }
        }, (error) => this.errorService.handleError(error, {prefix: `Unable to restore assessment "${
                assessment.name
            }"`}));
    }

    private async sendAssessmentEmail(assessment : FormattedAssessment) {
        const modal = this.modalService.confirm({
            nzOnOk: () => true,
            nzTitle: 'Send Assessment Email',
            nzContent: `
            Are you sure you want to send the email?`
        });

        const confirmation = await modal.afterClose.toPromise();
        if (! confirmation) 
            return;
        

        this.loading = true;
        this.assessmentService.sendAssessmentEmail(assessment).pipe(finalize(() => (this.loading = false))).subscribe((archived) => {
            if (!archived) {
                this.getAssessments();
            } else {
                this.getAssessments();
            }
        }, (error) => this.errorService.handleError(error, {prefix: `Unable to send email at this moment.`}));
    }


    private createSearchFilter(searchString : string): Array < {
        [K in keyof Partial < FormattedAssessment >]: {}
    } > {
        return [
            {
                assessmentType: {
                    or: [
                        {
                            name: {
                                iLike: `%${searchString}%`
                            }
                        }
                    ]
                }
            }, {
                patient: {
                    or: [
                        {
                            firstName: {
                                iLike: `%${searchString}%`
                            }
                        }, {
                            middleName: {
                                iLike: `%${searchString}%`
                            }
                        }, {
                            lastName: {
                                iLike: `%${searchString}%`
                            }
                        }, {
                            medicalRecordNo: {
                                iLike: `%${searchString}%`
                            }
                        },
                    ]
                }
            }, {
                clinician: {
                    or: [
                        {
                            firstName: {
                                iLike: `%${searchString}%`
                            }
                        }, {
                            middleName: {
                                iLike: `%${searchString}%`
                            }
                        }, {
                            lastName: {
                                iLike: `%${searchString}%`
                            }
                        }, {
                            workID: {
                                iLike: `%${searchString}%`
                            }
                        },
                    ]
                }
            },
        ];
    }

    private showAssessment({uuid} : FormattedAssessment): void {
        window.open(this.generateAssessmentURL(uuid));
    }

    private copyAssessmentLink({uuid} : FormattedAssessment): void {
        const url = new URL(this.generateAssessmentURL(uuid), window.location.origin);
        this.clipboardService.copy(url.toString());
        this.messageService.create('success', 'Assessment link copied to clipboard');
    }

    private generateAssessmentURL(assesmentUuid : string): string {
        const cryptoId = CryptoJS.AES.encrypt(assesmentUuid, environment.secretKey).toString();
        const tree = this.router.createUrlTree(['/assessment/overview'], {
            queryParams: {
                assessment: cryptoId
            }
        });
        return this.locationStrategy.prepareExternalUrl(this.router.serializeUrl(tree));
    }

    private get userId(): number {
        const user = JSON.parse(localStorage.getItem('user'))as User;
        return user.id ?? 0;
    }
}