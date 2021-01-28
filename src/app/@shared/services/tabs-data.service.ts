import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { TabInterface } from '../../@layout/vertical/header/tabs/tab.interface';

@Injectable({
  providedIn: 'root',
})
export class TopTabsDataService {
  public get tabs(): Observable<TabInterface[]> {
    return this._tabs.asObservable();
  }

  public get selectedIndex(): Observable<number> {
    return this._selectedIndex.asObservable();
  }

  private _tabs = new BehaviorSubject<TabInterface[]>([]);
  private _selectedIndex = new BehaviorSubject<number>(-1);

  constructor() {}

  updateTabs(data: TabInterface[]) {
    this._tabs.next(data);
  }

  updateSelectedIndex(data: number) {
    this._selectedIndex.next(data);
  }
}
