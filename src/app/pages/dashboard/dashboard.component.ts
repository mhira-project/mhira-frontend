import { Component } from '@angular/core';
import { MhiraTranslations } from '../../@core/mhira-translations';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  constructor(public translations: MhiraTranslations) {}
}
