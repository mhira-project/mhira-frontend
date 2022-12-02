import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-no-tabs',
  templateUrl: './no-tabs.component.html',
  styleUrls: ['./no-tabs.component.scss'],
})
export class NoTabsComponent implements OnInit {
  user: any;

  constructor() {}

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user')).user;
  }
}
