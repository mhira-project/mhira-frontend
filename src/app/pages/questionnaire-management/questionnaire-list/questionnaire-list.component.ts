import { Convert } from '@shared/classes/convert';
import { Component } from '@angular/core';
import { QuestionnaireManagementService } from '../@services/questionnaire-management.service';
import { FormattedQuestionnaireVersion, QuestionnaireStatus } from '../@types/questionnaire';
import { TableColumn, Action, ActionArgs } from '../../../@shared/@modules/master-data/@types/list';
import { PermissionKey } from '../../../@shared/@types/permission';
import { AppPermissionsService } from '../../../@shared/services/app-permissions.service';
import { QuestionnaireColumns } from '../@tables/questionnaire.table';
import { Router } from '@angular/router';
import { environment } from '@env/environment';
import { NzModalService } from 'ng-zorro-antd';
import { finalize } from 'rxjs/operators';
import { ErrorHandlerService } from '../../../@shared/services/error-handler.service';

const CryptoJS = require('crypto-js');

enum ActionKey {
  ARCHIVE_QUESTIONNAIRE,
  DELETE_QUESTIONNAIRE,
}

@Component({
  selector: 'app-questionnaire-list',
  templateUrl: './questionnaire-list.component.html',
  styleUrls: ['./questionnaire-list.component.scss'],
})
export class QuestionnaireListComponent {
  public PK = PermissionKey;

  public data: FormattedQuestionnaireVersion[];

  public columns: TableColumn<FormattedQuestionnaireVersion>[] = QuestionnaireColumns;

  public actions: Action<ActionKey>[] = [];

  public loading = false;

  constructor(
    private qmService: QuestionnaireManagementService,
    public perms: AppPermissionsService,
    private router: Router,
    private modalService: NzModalService,
    private errorService: ErrorHandlerService
  ) {
    this.getQuestionnaires();

    if (this.perms.permissionsOnly(PermissionKey.MANAGE_QUESTIONNAIRES)) {
      this.actions.push({ key: ActionKey.ARCHIVE_QUESTIONNAIRE, title: 'Archive Questionnaire' });
    }
    if (this.perms.permissionsOnly(PermissionKey.DELETE_QUESTIONNAIRES)) {
      this.actions.push({ key: ActionKey.DELETE_QUESTIONNAIRE, title: 'Delete Questionnaire' });
    }
  }

  public onSelect(questionnaire: FormattedQuestionnaireVersion): void {
    const dataString = CryptoJS.AES.encrypt(JSON.stringify(questionnaire), environment.secretKey).toString();
    this.router.navigate(['/mhira/questionnaire-management/questionnaire-form'], {
      queryParams: {
        questionnaire: dataString,
      },
    });
  }

  public onAction({ action, context: questionnaire }: ActionArgs<FormattedQuestionnaireVersion, ActionKey>): void {
    switch (action.key) {
      case ActionKey.ARCHIVE_QUESTIONNAIRE:
        this.deleteQuestionnaire(questionnaire);
        return;
      case ActionKey.DELETE_QUESTIONNAIRE:
        this.deleteQuestionnaire(questionnaire, false);
        return;
    }
  }

  private getQuestionnaires(): void {
    this.loading = true;
    this.qmService
      .getQuestionnaires({ status: null })
      .pipe(finalize(() => (this.loading = false)))
      .subscribe((questionnaires) => {
        this.data = questionnaires.map((q) => Convert.toFormattedQuestionnaireVersion(q));
      });
  }

  private async deleteQuestionnaire(
    questionnaire: FormattedQuestionnaireVersion,
    archive: boolean = true
  ): Promise<void> {
    if (!archive) {
      // create confirmation modal
      const modal = this.modalService.confirm({
        nzOnOk: () => true,
        nzTitle: 'Delete Questionnaire',
        nzContent: `
        Are you sure you want to delete ${questionnaire.name}? This action is irreversible
      `,
      });

      // wait for modal to successfully complete
      const confirmation = await modal.afterClose.toPromise();
      if (!confirmation) return;
    }

    this.loading = true;
    this.qmService
      .deleteQuestionnaire(questionnaire.questionnaire._id, archive)
      .pipe(finalize(() => (this.loading = false)))
      .subscribe(
        () => {
          if (archive) {
            questionnaire.status = QuestionnaireStatus.ARCHIVED;
            questionnaire = Convert.toFormattedQuestionnaireVersion(questionnaire);
          } else {
            this.data.splice(this.data.indexOf(questionnaire), 1);
          }
        },
        (error) =>
          this.errorService.handleError(error, { prefix: `Unable to delete assessment "${questionnaire.name}"` })
      );
  }
}
