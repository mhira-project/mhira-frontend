import { Component, Input, OnInit } from '@angular/core';
import {
  CreateOneScriptInput,
  Scripts,
  UpdateOneScriptInput,
} from '@app/pages/questionnaire-management/@types/scripts';
import {
  Action,
  ActionArgs,
  DEFAULT_PAGE_SIZE,
  SortField,
  TableColumn,
} from '@shared/@modules/master-data/@types/list';
import { ScriptColumns } from '@app/pages/questionnaire-management/@tables/scripts';
import { PageInfo, Paging } from '@shared/@types/paging';
import { ScriptForm, UpdateScriptForm } from '@app/pages/questionnaire-management/@forms/script.form';
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
import { QuestionnaireVersion } from '@app/pages/questionnaire-management/@types/questionnaire';
import { NzModalService } from 'ng-zorro-antd/modal';
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
  public onUpdate = true;
  public selectedReport: Reports[] = [];

  // form properties
  public showCreateScript = false;
  public populateForm = false;
  public resetForm = false;
  public script: Scripts;
  public scriptForm = ScriptForm;

  public actions: Action<ActionKey>[] = [];

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
    private modalService: NzModalService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getScripts();
    this.getReports();
    this.actions = [
      { key: ActionKey.EDIT_SCRIPT, title: 'Edit Script' },
      { key: ActionKey.DOWNLOAD_SCRIPT, title: 'Download Script' },
      { key: ActionKey.DELETE_SCRIPT, title: 'Delete Script' },
    ];
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

  public handleRowClick(event: any) {
    this.populateForm = true;
    this.openCreatePanel(event);
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

  public onAction({ action, context: script }: ActionArgs<Scripts, ActionKey>): void {
    switch (action.key) {
      case ActionKey.EDIT_SCRIPT:
        this.openCreatePanel(script);
        return;
      case ActionKey.DOWNLOAD_SCRIPT:
        this.downloadScript(script);
        return;
      case ActionKey.DELETE_SCRIPT:
        this.deleteScript(script);
        return;
    }
  }

  public openCreatePanel(script?: Scripts): void {
    if (script) {
      this.script = script;
      this.onUpdate = true;
    } else {
      this.onUpdate = false;
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

  public createScript() {
    this.isLoading = true;
    this.populateForm = false;
    this.resetForm = false;
    console.log(this.onUpdate);
    const inputValues = {};
    this.scriptForm?.groups[0]?.fields?.map((field) => {
      inputValues[field.name] = field.value;
    });

    const inputData: any = { ...inputValues };
    const reports = this.selectedReport.map((item) => item.id, inputValues);
    const scriptText = (inputData.scriptText as FileList).item(0);
    const scriptInput: CreateOneScriptInput = { ...inputValues, scriptText, reportIds: reports };
    scriptInput.questionnaireId = this.questionnaire._id;
    this.loadingMessage = `Creating script ${inputData.name} `;

    if (this.onUpdate) {
      return this.scriptsService
        .updateScript(this.script.id, scriptInput)
        .pipe(finalize(() => (this.isLoading = false)))
        .subscribe(
          ({ data }) => {
            const list = [...this.data];
            const updatedScript: Scripts = data.updateOneScript;
            this.closeCreatePanel();
            this.getScripts();
          },
          (error) => this.errorService.handleError(error, { prefix: 'Unable to update script' })
        );
    }
    this.scriptsService
      .createScript(scriptInput)
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
          if (this.selectedReport.length > 0) {
          }
          this.closeCreatePanel();
          this.getScripts();
        },
        (error) =>
          this.errorService.handleError(error, {
            prefix: 'Unable to create script',
          })
      );
  }

  // private updateScript(script: Scripts): void {
  //   const scriptLocal = JSON.parse(JSON.stringify(script));
  //   const id = scriptLocal.id;
  //   delete scriptLocal.id;
  //   const updateOneScriptInput: UpdateOneScriptInput = {
  //     id,
  //     update: scriptLocal,
  //   };
  //   this.isLoading = true;
  //   this.scriptsService
  //     .updateScript(updateOneScriptInput)
  //     .pipe(finalize(() => (this.isLoading = false)))
  //     .subscribe(
  //       ({ data }) => {
  //         const list = [...this.data];
  //         const updatedScript: Scripts = data.updateOneScript;
  //         const idx = list.findIndex((scr) => scr.id === updatedScript.id);
  //         list.splice(idx, 1, updatedScript);
  //         this.data = list; // mutate reference to trigger change detection
  //         this.closeCreatePanel();
  //       },
  //       (error) => this.errorService.handleError(error, { prefix: 'Unable to update script' })
  //     );
  // }

  private afterCreate() {
    this.populateForm = false;
    this.resetForm = true;
    // const dataString = CryptoJS.AES.encrypt(JSON.stringify(this.script), environment.secretKey).toString();
    // this.router.navigate(['/mhira/questionnaire-management/questionnaire-form'], {
    //   state: {
    //     title: `${this.script.name} `,
    //   },
    //   queryParams: {
    //     script: dataString,
    //   },
    // });
    this.newMode = false;
  }

  private async deleteScript(script: Scripts): Promise<void> {
    const modal = this.modalService.confirm({
      nzOnOk: () => true,
      nzTitle: 'Delete script',
      nzContent: `
        Are you sure you want to delete ${script.name}? This action is irreversible.
      `,
    });

    if (!(await modal.afterClose.toPromise())) return;

    this.isLoading = true;
    this.scriptsService
      .deleteScript(script)
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe(
        () => {
          const data = [...this.data];
          data.splice(this.data.indexOf(script), 1);
          this.data = data; // mutate reference to trigger change detection
        },
        (err) => this.errorService.handleError(err, { prefix: `Unable to delete script "${script.name}"` })
      );
  }

  private getScripts(): void {
    this.isLoading = true;
    this.scriptsRequestOptions.questionnaireId = this.questionnaire._id;
    this.scriptsService
      .scripts(this.scriptsRequestOptions)
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe(
        ({ data }: any) => {
          this.data = data.scripts.edges.map((script: any) => ScriptsModel.fromJson(script.node));
          this.pageInfo = data.scripts.pageInfo;
        },
        (err) => this.errorService.handleError(err, { prefix: 'Unable to load scripts' })
      );
  }
  private downloadScript(script: Scripts) {
    const file = new Blob([script.scriptText], { type: '.r' });
    const a = document.createElement('a');
    const url = URL.createObjectURL(file);
    a.href = url;
    a.download = script.name + '.r';
    document.body.appendChild(a);
    a.click();
    setTimeout(() => {
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    }, 0);
  }

  private createSearchFilter(searchString: string): Array<{ [K in keyof Partial<Scripts>]: {} }> {
    if (!searchString) return [];
    return [{ name: { iLike: `%${searchString}%` } }, { creator: { iLike: `%${searchString}%` } }];
  }
}
