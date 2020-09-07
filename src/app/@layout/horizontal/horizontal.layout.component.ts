import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService, CredentialsService } from '@app/auth';

@Component({
  selector: 'app-horizontal-layout',
  templateUrl: './horizontal.layout.component.html',
})
export class HorizontalLayoutComponent {
  menuHidden = true;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private credentialsService: CredentialsService
  ) {}

  toggleMenu() {
    this.menuHidden = !this.menuHidden;
  }

  logout() {
    this.authenticationService.logout().subscribe(() => this.router.navigate(['/auth/login'], { replaceUrl: true }));
  }

  get username(): string | null {
    const credentials = this.credentialsService.credentials;
    return credentials ? credentials.username : null;
  }
}
