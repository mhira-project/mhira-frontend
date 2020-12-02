import { Component, OnInit } from '@angular/core';
import { CaseManagersTable } from '../@tables/case-managers.table';
import { CaseManager } from '@app/pages/home/@types/case-manager';
import { CaseManagersService } from '@app/pages/home/@services/case-managers.service';
import { Paging } from '@shared/@types/paging';
import { CaseManagerModel } from '@app/pages/home/@models/case-manager.model';

@Component({
  selector: 'app-case-managers',
  templateUrl: './case-managers.component.html',
  styleUrls: ['./case-managers.component.scss'],
})
export class CaseManagersComponent implements OnInit {
  paging: Paging = {
    first: 10,
  };
  pageInfo: any;
  caseManagers: CaseManager[] = [];
  caseManagersTable: { columns: any[]; rows: CaseManager[] } = {
    columns: CaseManagersTable.columns,
    rows: [],
  };
  actions = CaseManagersTable.actions;
  selectedIndex = -1;
  isLoading = false;

  constructor(private caseManagersService: CaseManagersService) {}

  ngOnInit(): void {
    this.getCaseManagers();
  }

  getCaseManagers() {
    this.isLoading = true;
    this.caseManagers = [];
    this.caseManagersTable.rows = [];
    this.caseManagersService.getPatientCaseManagers().subscribe(
      async ({ data }: any) => {
        data.getPatientCaseManagers.edges.map((caseManager: any) => {
          this.caseManagers.push(CaseManagerModel.fromJson(caseManager.node));
        });
        this.caseManagersTable.rows = this.caseManagers;
        this.paging.after = data.getPatientCaseManagers.pageInfo.endCursor;
        this.paging.before = data.getPatientCaseManagers.pageInfo.startCursor;
        this.pageInfo = data.getPatientCaseManagers.pageInfo;
        this.isLoading = false;
      },
      (error: any) => {
        this.isLoading = false;
      }
    );
  }

  navigatePages(direction: string, pageSize: number = 10) {
    switch (direction) {
      case 'next':
        this.paging.before = undefined;
        this.paging.first = pageSize;
        this.paging.last = undefined;
        break;
      case 'previous':
        this.paging.after = undefined;
        this.paging.first = undefined;
        this.paging.last = pageSize;
        break;
    }
    this.getCaseManagers();
  }

  toggleCreatePanel() {}

  handleActionClick(event: any): void {
    this.selectedIndex = event.index;
    switch (event.action.name) {
      case 'Delete':
        break;
    }
  }
}
