import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-select-modal',
  templateUrl: './select-modal.component.html',
  styleUrls: ['./select-modal.component.scss'],
})
export class SelectModalComponent<T> {
  @Input()
  public options: T[];

  @Input()
  public selected: T;

  @Input()
  public titleField: keyof T;
}
