import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  user: any;
  notificationList: any = [];

  constructor() {}

  ngOnInit(): void {
    this.getUser();
  }

  getUser() {
    const userObj = JSON.parse(localStorage.getItem('auth_app_token'));
    if (userObj) this.user = userObj.user;
  }

  logout() {}
}
