import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TabInterface } from '../../@layout/vertical/header/tabs/tab.interface';

@Injectable({
  providedIn: 'root',
})
export class TopTabsDataService {
  private _tabs = new BehaviorSubject<TabInterface[]>([]);
  private _selectedIndex = new BehaviorSubject<number>(-1);
  public tabs = this._tabs.asObservable();
  public selectedIndex = this._selectedIndex.asObservable();
  constructor() {}
  updateTabs(data: TabInterface[]) {
    this._tabs.next(data);
  }
  updateSelectedIndex(data: number) {
    this._selectedIndex.next(data);
  }
}
