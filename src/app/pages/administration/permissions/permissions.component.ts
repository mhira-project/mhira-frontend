import { Component, OnInit } from '@angular/core';
import { Paging } from '@shared/@types/paging';
import { Permission } from '@app/pages/administration/@types/permission';
import { PermissionsTable } from '@app/pages/administration/@tables/permissions.table';
import { environment } from '@env/environment';
import { Sorting } from '@shared/@types/sorting';
import { Filter } from '@shared/@types/filter';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { Router } from '@angular/router';
import { PermissionsService } from '@app/pages/administration/@services/permissions.service';
import { DateService } from '@shared/services/date.service';

const CryptoJS = require('crypto-js');

@Component({
  selector: 'app-permissions',
  templateUrl: './permissions.component.html',
  styleUrls: ['./permissions.component.scss'],
})
export class PermissionsComponent implements OnInit {
  isLoading = false;
  modalLoading = false;
  permissions: Permission[] = [];
  paging: Paging = {
    first: 10,
  };
  pageInfo: any;
  permissionsTable: { columns: any[]; rows: Permission[] } = {
    columns: PermissionsTable.columns,
    rows: [],
  };
  actions = PermissionsTable.actions;

  constructor(
    private permissionsService: PermissionsService,
    private modalService: NzModalService,
    private message: NzMessageService,
    private dateService: DateService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getPermissions();
  }

  getPermissions(params?: { paging?: Paging; filter?: Filter; sorting?: Sorting }) {
    this.isLoading = true;
    this.permissions = [];
    const _permissions: any[] = [];
    this.permissionsService.permissions(params).subscribe(
      async ({ data }) => {
        const permissions = data.permissions;
        permissions.edges.map((permission: any) => {
          const row = Object.assign({}, permission.node);
          _permissions.push({
            name: row.name,
            guard: row.guard,
            createdAt: row.createdAt ? this.dateService.formatDate(row.createdAt) : '',
          });
          this.permissions.push(permission.node);
        });

        this.permissionsTable.rows = _permissions;
        this.paging.after = data.permissions.pageInfo.endCursor;
        this.paging.before = data.permissions.pageInfo.startCursor;
        this.pageInfo = data.permissions.pageInfo;
        this.isLoading = false;
      },
      (error) => {
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
    this.getPermissions({ paging: this.paging });
  }

  handleActionClick(event: any): void {
    switch (event.action.name) {
      case 'Edit Permission':
        console.log('view results');
        break;
    }
  }

  handleRowClick(event: any) {
    const dataString = CryptoJS.AES.encrypt(
      JSON.stringify(this.permissions[event.index]),
      environment.secretKey
    ).toString();
    this.router.navigate(['/mhira/permissions/plan-permissions'], {
      state: {
        title: `${this.permissions[event.index].name}`,
      },
      queryParams: {
        permission: dataString,
      },
    });
  }
}
