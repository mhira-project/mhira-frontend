import { Component } from '@angular/core';
import { QuestionnaireManagementService } from '../@services/questionnaire-management.service';
import { QuestionnaireVersion, QuestionnaireStatus } from '../@types/questionnaire';
import { TableColumn, TagInfo } from '../../../@shared/@modules/master-data/@types/list';
import { PermissionKey } from '../../../@shared/@types/permission';
import { AppPermissionsService } from '../../../@shared/services/app-permissions.service';

type QuestionnaireItem = QuestionnaireVersion & { formattedStatus: TagInfo; formattedKeywords: TagInfo[] };

const statusColor = {
  [QuestionnaireStatus.DRAFT]: 'blue',
  [QuestionnaireStatus.PRIVATE]: 'orange',
  [QuestionnaireStatus.PUBLISHED]: 'green',
  [QuestionnaireStatus.ARCHIVED]: 'red',
};

@Component({
  selector: 'app-questionnaire-list',
  templateUrl: './questionnaire-list.component.html',
  styleUrls: ['./questionnaire-list.component.scss'],
})
export class QuestionnaireListComponent {
  public PK = PermissionKey;

  public data: QuestionnaireItem[];

  public columns: TableColumn<QuestionnaireItem>[] = [
    {
      title: 'Name',
      name: 'name',
    },
    {
      title: 'Status',
      name: 'formattedStatus',
      altName: 'status',
      render: 'tag',
    },
    {
      title: 'Keywords',
      name: 'formattedKeywords',
      altName: 'keywords',
      render: 'tag',
    },
    {
      title: 'Time to complete',
      name: 'timeToComplete',
    },
    {
      title: 'Copyright',
      name: 'copyright',
    },
    {
      title: 'Website',
      name: 'website',
    },
    {
      title: 'License',
      name: 'license',
    },
    {
      title: 'Created at',
      name: 'createdAt',
      render: 'date',
    },
  ];

  constructor(private qmService: QuestionnaireManagementService, public perms: AppPermissionsService) {
    this.getQuestionnaires();
  }

  public onFileSelect(event: Event): void {
    const target = event.target as HTMLInputElement;
    const file = target.files.item(0);

    if (!file) return;
    this.qmService.uploadQuestionnaire(file).subscribe((x) => console.log(x));
  }

  private getQuestionnaires(): void {
    this.qmService.getQuestionnaires({ status: null }).subscribe(({ data }) => {
      this.data = data.questionnaires.map((q) => ({
        ...q,
        formattedStatus: {
          color: statusColor[q.status],
          title: q.status,
        },
        formattedKeywords:
          q?.keywords?.map((k) => ({
            color: 'blue',
            title: k,
          })) ?? [],
      }));
    });
  }
}
