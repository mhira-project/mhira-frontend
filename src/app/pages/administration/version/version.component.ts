import { Component, OnInit } from '@angular/core';
import packageInfo from '../../../../../package.json';

@Component({
  selector: 'app-version',
  templateUrl: './version.component.html',
  styleUrls: ['./version.component.scss'],
})
export class VersionComponent implements OnInit {
  version: string = packageInfo.version;

  constructor() {}

  ngOnInit(): void {}
}
