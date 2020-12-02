import { Component, OnInit, Input } from '@angular/core';
import { CaseManagersTable } from '../@tables/case-managers.table';
import { CaseManager } from '@app/pages/home/@types/case-manager';
import { CaseManagersService } from '@app/pages/home/@services/case-managers.service';
import { Paging } from '@shared/@types/paging';
import { CaseManagerModel } from '@app/pages/home/@models/case-manager.model';
import { CaseManagersFilterForm } from '@app/pages/home/@forms/case-managers-filter.form';
import { PatientsService } from '@app/pages/home/@services/patients.service';
import { CaseManagerFilter } from '@app/pages/home/@types/case-manager-filter';
import { UsersService } from '@app/pages/administration/@services/users.service';
import { Patient } from '@app/pages/home/@types/patient';
import { Subject, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-case-managers',
  templateUrl: './case-managers.component.html',
  styleUrls: ['./case-managers.component.scss'],
})
export class CaseManagersComponent implements OnInit {
  @Input() query = 'getPatientCaseManagers';
  @Input() filter: CaseManagerFilter;
  @Input() patient: Patient;
  paging: Paging = {
    first: 10,
  };
  pageInfo: any;
  caseManagers: CaseManager[] = [];
  users: CaseManager[] = [];
  caseManagersTable: { columns: any[]; rows: CaseManager[] } = {
    columns: CaseManagersTable.columns,
    rows: [],
  };
  caseManagersFilterForm = CaseManagersFilterForm;
  actions = CaseManagersTable.actions;
  selectedIndex = -1;
  isLoading = false;
  showFilter = false;
  showAssignModal = false;

  public searchKeyword = new Subject<string>();
  private searchKeywordSearchSubscription: Subscription;

  constructor(
    private caseManagersService: CaseManagersService,
    private patientService: PatientsService,
    private usersService: UsersService
  ) {
    this.searchKeywordSearchSubscription = this.searchKeyword
      .pipe(debounceTime(1000), distinctUntilChanged())
      .subscribe((event: any) => {
        if (event && event.target.value !== '') {
          this.searchCaseManagers(event.target.value);
        }
      });
  }

  ngOnInit(): void {
    this.getCaseManagers();
  }

  getCaseManagerServiceProperty(property: any, params?: any) {
    return this.caseManagersService[property](params);
  }

  getCaseManagers() {
    this.isLoading = true;
    this.caseManagers = [];
    this.caseManagersTable.rows = [];
    this.getCaseManagerServiceProperty(this.query, this.filter).subscribe(
      async ({ data }: any) => {
        data[this.query].edges.map((caseManager: any) => {
          this.caseManagers.push(CaseManagerModel.fromJson(caseManager.node));
        });
        this.caseManagersTable.rows = this.caseManagers;
        this.paging.after = data[this.query].pageInfo.endCursor;
        this.paging.before = data[this.query].pageInfo.startCursor;
        this.pageInfo = data[this.query].pageInfo;
        this.isLoading = false;
      },
      (error: any) => {
        this.isLoading = false;
      }
    );
  }

  searchPatients(keyword: string) {
    const options: { label: string; value: number }[] = [];
    this.patientService.getPatients({ filter: { firstName: { iLike: keyword } } }).subscribe(
      async ({ data }) => {
        data.patients.edges.map((patient: any) => {
          const option = { value: patient.node.id, label: `${patient.node.firstName} ${patient.node.lastName}` };
          if (options.indexOf(option) === -1) {
            options.push(option);
          }
        });
        this.caseManagersFilterForm.groups[0].fields[1].options = options;
      },
      (error) => {
        this.isLoading = false;
      }
    );
  }

  searchCaseManagers(keyword: string) {
    this.users = [];
    const options: { label: string; value: number }[] = [];
    this.usersService.getUsers({ firstName: { iLike: keyword } }).subscribe(
      async ({ data }) => {
        const users: CaseManager[] = [];
        data.users.edges.map((user: any) => {
          users.push(CaseManagerModel.fromJson(user.node));
          const option = { value: user.node.id, label: `${user.node.firstName} ${user.node.lastName}` };
          if (options.indexOf(option) === -1) {
            options.push(option);
          }
        });
        this.users = users;
        this.caseManagersFilterForm.groups[0].fields[2].options = options;
      },
      (error) => {
        this.isLoading = false;
      }
    );
  }

  assignManager(manager: CaseManager) {}

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

  toggleFilterDrawer() {
    this.showFilter = !this.showFilter;
  }

  toggleAssignModal(): void {
    this.showAssignModal = !this.showAssignModal;
  }

  handleSearchOptions(search: any) {
    switch (search.field.name) {
      case 'patientId':
        this.searchPatients(search.keyword);
        break;
      case 'caseManagerId':
        this.searchCaseManagers(search.keyword);
        break;
    }
  }

  handleActionClick(event: any): void {
    this.selectedIndex = event.index;
    switch (event.action.name) {
      case 'Delete':
        break;
    }
  }

  filterCaseManagers(filter: any) {
    this.filter = filter;
    this.getCaseManagers();
  }
}
