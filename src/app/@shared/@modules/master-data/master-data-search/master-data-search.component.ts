import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-master-data-search',
  templateUrl: './master-data-search.component.html',
  styleUrls: ['./master-data-search.component.scss'],
})
export class MasterDataSearchComponent {
  @Input()
  public placeholder: string;

  @Output()
  public search = new EventEmitter<Event>();
}
