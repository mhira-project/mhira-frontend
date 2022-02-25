import { Component, Input, OnInit } from '@angular/core';
import { FormattedPatient } from '@app/pages/patients-management/@types/formatted-patient';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss'],
})
export class ReportsComponent implements OnInit {
  @Input() public patient: FormattedPatient;

  constructor() {}

  ngOnInit(): void {}
}
