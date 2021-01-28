import { Injectable } from '@angular/core';
import { Paging } from '@shared/@types/paging';

@Injectable({
  providedIn: 'root',
})
export class PaginationService {
  navigatePages(paging: Paging, direction: 'next' | 'previous', pageSize: number = 10) {
    switch (direction) {
      case 'next':
        paging.before = undefined;
        paging.first = pageSize;
        paging.last = undefined;
        break;
      case 'previous':
        paging.after = undefined;
        paging.first = undefined;
        paging.last = pageSize;
        break;
    }
    return paging;
  }
}
