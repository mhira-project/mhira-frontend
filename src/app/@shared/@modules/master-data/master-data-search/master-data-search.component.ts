import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-master-data-search',
  templateUrl: './master-data-search.component.html',
  styleUrls: ['./master-data-search.component.scss'],
})
export class MasterDataSearchComponent {
  @Output()
  public search = new EventEmitter<Event>();
}
