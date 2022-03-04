import { Component, OnInit } from '@angular/core';
import { Scripts } from '@app/pages/questionnaire-management/@types/scripts';
import { TableColumn } from '@shared/@modules/master-data/@types/list';
import { ScriptColumns } from '@app/pages/questionnaire-management/@tables/scripts';
import { PageInfo } from '@shared/@types/paging';
import { ScriptForm } from '@app/pages/questionnaire-management/@forms/script.form';
import { PermissionKey } from '@shared/@types/permission';

@Component({
  selector: 'app-questionnaire-script',
  templateUrl: './questionnaire-script.component.html',
  styleUrls: ['./questionnaire-script.component.scss'],
})
export class QuestionnaireScriptComponent implements OnInit {
  public data: Partial<Scripts>[];
  public columns: TableColumn<Partial<Scripts>>[] = ScriptColumns;
  public isLoading = false;
  public pageInfo: PageInfo;

  // form properties
  public showCreateScript = false;
  public populateForm = false;
  public resetForm = false;
  public script: Scripts;
  public scriptForm = ScriptForm;
  constructor() {}

  ngOnInit(): void {}

  public openCreatePanel(script?: Scripts): void {
    if (script) {
      this.script = script;
    }
    this.showCreateScript = true;
    this.populateForm = true;
    this.resetForm = true;
  }

  public closeCreatePanel(): void {
    this.script = null;
    this.showCreateScript = false;
    this.populateForm = false;
    this.resetForm = false;
  }
}
