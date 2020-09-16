import { Component, OnInit } from '@angular/core';
import { AuthService } from '@app/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  user: any;
  notificationList: any = [];

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.getUser();
  }

  getUser() {
    const userObj = JSON.parse(localStorage.getItem('user'));
    if (userObj) this.user = userObj.user;
  }

  logout() {
    this.authService.logout();
  }
}
