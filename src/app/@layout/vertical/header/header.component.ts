import { Component, OnInit } from '@angular/core';
import { AuthService } from '@app/auth/auth.service';
import { Router } from '@angular/router';

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
    const userObj = JSON.parse(localStorage.getItem('user'));
    if (userObj) this.user = userObj.user;
  }

  logout() {
    this.authService.logout().subscribe(
      async ({ data }) => {
        this.isOkLoading = false;
        localStorage.removeItem('auth_app_token');
        localStorage.removeItem('user');
        this.router.navigate(['/auth/login']);
      },
      (error) => {
        this.isOkLoading = false;
      }
    );
  }
}
