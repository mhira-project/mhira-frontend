import { Component, OnInit } from '@angular/core';
import { AuthService } from '@app/auth/auth.service';
import { Router } from '@angular/router';
import { environment } from '@env/environment';

const CryptoJS = require('crypto-js');

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  isOkLoading: boolean = false;
  user: any;
  notificationList: any = [];

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.getUser();
  }

  getUser() {
    this.user = JSON.parse(localStorage.getItem('user'));
  }

  editUserProfile() {
    const dataString = CryptoJS.AES.encrypt(JSON.stringify(this.user), environment.secretKey).toString();
    this.router.navigate(['/mhira/administration/user-management/form'], {
      state: {
        title: `${this.user.firstName} ${this.user.lastName}`,
      },
      queryParams: {
        user: dataString,
      },
    });
  }

  logout() {
    this.authService.logout().subscribe(
      async ({ data }) => {
        this.isOkLoading = false;
        const items = ['auth_app_token', 'user', 'settings', 'tabs', 'activeTabIndex', 'permissions'];
        for (const item of items) {
          localStorage.removeItem(item);
        }
        this.router.navigate(['/auth/login']);
      },
      (error) => {
        this.isOkLoading = false;
      }
    );
  }
}
