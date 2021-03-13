import { Convert } from '@shared/classes/convert';
import { Component } from '@angular/core';
import { QuestionnaireManagementService } from '../@services/questionnaire-management.service';
import { FormattedQuestionnaireVersion } from '../@types/questionnaire';
import { TableColumn } from '../../../@shared/@modules/master-data/@types/list';
import { PermissionKey } from '../../../@shared/@types/permission';
import { AppPermissionsService } from '../../../@shared/services/app-permissions.service';
import { QuestionnaireColumns } from '../@tables/questionnaire.table';

@Component({
  selector: 'app-questionnaire-list',
  templateUrl: './questionnaire-list.component.html',
  styleUrls: ['./questionnaire-list.component.scss'],
})
export class QuestionnaireListComponent {
  public PK = PermissionKey;

  public data: FormattedQuestionnaireVersion[];

  public columns: TableColumn<FormattedQuestionnaireVersion>[] = QuestionnaireColumns;

  constructor(private qmService: QuestionnaireManagementService, public perms: AppPermissionsService) {
    this.getQuestionnaires();
  }

  private getQuestionnaires(): void {
    this.qmService.getQuestionnaires({ status: null }).subscribe((questionnaires) => {
      this.data = questionnaires.map((q) => Convert.toFormattedQuestionnaireVersion(q));
    });
  }
}
