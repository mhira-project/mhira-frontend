import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@app/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  validateForm!: FormGroup;
  isLoading = false;
  hasErrors = false;
  errors: string[] = [];

  constructor(private fb: FormBuilder, private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      identifier: [null, [Validators.required]],
      password: [null, [Validators.required]],
    });
  }

  signIn(credentials: any) {
    this.hasErrors = false;
    this.errors = [];
    this.isLoading = true;
    this.authService.login(credentials).subscribe(
      async ({ data }) => {
        localStorage.setItem(
          'auth_app_token',
          JSON.stringify({
            accessToken: data['login'].accessToken,
            refreshToken: data['login'].refreshToken,
          })
        );
        localStorage.setItem(
          'user',
          JSON.stringify({
            user: data['login'].user,
          })
        );
        this.isLoading = false;
        this.router.navigate(['/mhira/home/patients']);
      },
      (error) => {
        this.hasErrors = true;
        for (let i = 0; i < error.graphQLErrors.length; i++) {
          this.errors.push(error.graphQLErrors[i].message);
        }
        this.isLoading = false;
      }
    );
  }

  submitForm(): void {
    if (this.validateForm.status === 'VALID') {
      const credentials = {
        identifier: this.validateForm.controls.identifier.value,
        password: this.validateForm.controls.password.value,
      };
      this.signIn(credentials);
    }
  }
}