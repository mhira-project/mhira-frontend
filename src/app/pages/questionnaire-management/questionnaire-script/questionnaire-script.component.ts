import { Component, Input, OnInit } from '@angular/core';
import { CreateOneScriptInput, CreateScriptInput, Scripts } from '@app/pages/questionnaire-management/@types/scripts';
import {
  Action,
  ActionArgs,
  DEFAULT_PAGE_SIZE,
  SortField,
  TableColumn,
} from '@shared/@modules/master-data/@types/list';
import { ScriptColumns } from '@app/pages/questionnaire-management/@tables/scripts';
import { PageInfo, Paging } from '@shared/@types/paging';
import { ScriptForm } from '@app/pages/questionnaire-management/@forms/script.form';
import { finalize } from 'rxjs/operators';
import { ScriptsService } from '@app/pages/questionnaire-management/@services/scripts.service';
import { Filter } from '@shared/@types/filter';
import { Sorting } from '@shared/@types/sorting';
import { ErrorHandlerService } from '@shared/services/error-handler.service';
import { Reports } from '@app/pages/administration/@types/reports';
import { Convert } from '@shared/classes/convert';
import { ReportsService } from '@app/pages/administration/@services/reports.service';
import { environment } from '@env/environment';
import { Router } from '@angular/router';
import { ScriptsModel } from '@app/pages/questionnaire-management/@models/script.model';
import { NzMessageService } from 'ng-zorro-antd/message';
import {
  FormattedQuestionnaireVersion,
  QuestionnaireVersion,
} from '@app/pages/questionnaire-management/@types/questionnaire';
import { createLogErrorHandler } from '@angular/compiler-cli/ngcc/src/execution/tasks/completion';

const CryptoJS = require('crypto-js');

enum ActionKey {
  EDIT_SCRIPT,
  DOWNLOAD_SCRIPT,
  DELETE_SCRIPT,
}

@Component({
  selector: 'app-questionnaire-script',
  templateUrl: './questionnaire-script.component.html',
  styleUrls: ['./questionnaire-script.component.scss'],
})
export class QuestionnaireScriptComponent implements OnInit {
  @Input() public questionnaire: QuestionnaireVersion;
  public data: Partial<Scripts>[];
  public columns: TableColumn<Partial<Scripts>>[] = ScriptColumns;
  public isLoading = false;
  public pageInfo: PageInfo;
  public reports: Reports[] = [];
  public newMode = false;
  public loadingMessage = '';
  public selectedReport: Reports[] = [];
  public actions: Action<ActionKey>[] = [
    { key: ActionKey.EDIT_SCRIPT, title: 'Edit Script' },
    { key: ActionKey.DOWNLOAD_SCRIPT, title: 'Download Script' },
    { key: ActionKey.DELETE_SCRIPT, title: 'Delete Script' },
  ];

  // form properties
  public showCreateScript = false;
  public populateForm = false;
  public resetForm = false;
  public script: Scripts;
  public scriptForm = ScriptForm;

  public scriptsRequestOptions: { questionnaireId: string; paging: Paging; filter: Filter; sorting: Sorting[] } = {
    questionnaireId: '',
    paging: { first: DEFAULT_PAGE_SIZE },
    filter: {},
    sorting: [],
  };

  constructor(
    private errorService: ErrorHandlerService,
    private scriptsService: ScriptsService,
    private reportsService: ReportsService,
    private message: NzMessageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getScripts();
    this.getReports();
  }

  public onQuestionnaireId(questionnaireId: string): void {
    this.scriptsRequestOptions.questionnaireId = questionnaireId;
    this.getScripts();
  }

  public onPageChange(paging: Paging): void {
    this.scriptsRequestOptions.paging = paging;
    this.getScripts();
  }

  public onSort(sorting: SortField<Scripts>[]): void {
    this.scriptsRequestOptions.sorting = sorting;
    this.getScripts();
  }

  public onFilter(filter: Filter): void {
    this.scriptsRequestOptions.filter = filter;
    this.getScripts();
  }

  public onSearch(searchString: string): void {
    this.scriptsRequestOptions.filter = { or: this.createSearchFilter(searchString) };
    this.getScripts();
  }

  scriptHasReport(reportId: number): boolean {
    const roles = this.script?.reports?.filter((report) => report.id === reportId);
    return roles?.length > 0;
  }

  assignReportToScript(report: Reports, checked: boolean) {
    if (checked) {
      this.selectedReport.push(report);
    } else {
      this.selectedReport.filter((item) => item.id !== report.id);
    }
  }

  // public onAction({ action, context: script }: ActionArgs<Scripts, ActionKey>): void {
  //   switch (action.key) {
  //     case ActionKey.EDIT_SCRIPT:
  //       this.showAssessment(assessment);
  //       return;
  //     case ActionKey.COPY_ASSESSMENT_LINK:
  //       this.copyAssessmentLink(assessment);
  //       return;
  //     case ActionKey.ARCHIVE_ASSESSMENT:
  //       this.deleteAssessment(assessment);
  //       return;
  //     case ActionKey.DELETE_ASSESSMENT:
  //       this.deleteAssessment(assessment, false);
  //       return;
  //   }
  // }

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

  public getReports(params?: { paging?: Paging; filter?: Filter; sorting?: Sorting[] }) {
    const options: any = [];
    this.reports = [];
    this.reportsService.reports(params).subscribe(
      ({ data }: any) => {
        data.reports.edges.map((report: any) => {
          const _report = Convert.toReport(report.node);
          this.reports.push(_report);
          options.push({ label: _report.name, value: _report.id });
        });
      },
      (error) => this.errorService.handleError(error, { prefix: 'Unable to load reports' })
    );
  }

  afterCreate() {
    this.populateForm = false;
    this.resetForm = true;
    const dataString = CryptoJS.AES.encrypt(JSON.stringify(this.script), environment.secretKey).toString();
    this.router.navigate(['/mhira/questionnaire-management/questionnaire-form'], {
      state: {
        title: `${this.script.name} `,
      },
      queryParams: {
        report: dataString,
      },
    });
    this.newMode = false;
  }

  private getScripts(): void {
    this.isLoading = true;
    this.scriptsService
      .scripts(this.scriptsRequestOptions)
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe(
        ({ data }: any) => {
          this.data = data.scripts.edges.map((script: any) => ScriptsModel.fromJson(script.node));
          console.log('this.data', this.data);
          this.pageInfo = data.scripts.pageInfo;
        },
        (err) => this.errorService.handleError(err, { prefix: 'Unable to load scripts' })
      );
  }

  private createScript(formData: CreateScriptInput) {
    this.isLoading = true;
    this.populateForm = false;
    this.resetForm = false;
    const inputData: CreateScriptInput = Object.assign({}, formData);
    const reports = this.selectedReport.map((item) => item.id);
    const scriptInput: CreateOneScriptInput = {
      script: { ...inputData, reports },
    };
    this.loadingMessage = `Creating script ${inputData.name} `;
    this.scriptsService
      .createReport(scriptInput)
      .pipe(
        finalize(() => {
          this.isLoading = false;
          this.loadingMessage = '';
        })
      )
      .subscribe(
        ({ data }) => {
          this.message.create('success', `Script has successfully been created`);
          this.script = data.createOneScript;
          console.log(this.script);
          if (this.selectedReport.length > 0) {
            console.log(this.selectedReport);
          }
          this.afterCreate();
        },
        (error) =>
          this.errorService.handleError(error, {
            prefix: 'Unable to create script',
          })
      );
  }

  private createSearchFilter(searchString: string): Array<{ [K in keyof Partial<Scripts>]: {} }> {
    if (!searchString) return [];
    return [{ name: { iLike: `%${searchString}%` } }];
  }
}
