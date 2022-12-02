import { Injectable, Injector } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { Router } from '@angular/router';

/**
 * Prefixes all requests not starting with `http[s]` with `environment.serverUrl`.
 */
@Injectable({
  providedIn: 'root',
})
export class ApiPrefixInterceptor implements HttpInterceptor {
  constructor(private injector: Injector, private router: Router) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const userStr = localStorage.getItem('auth_app_token');
    if (userStr) {
      const user = JSON.parse(userStr);
      if (user.accessToken) {
        request = request.clone({
          headers: request.headers.set('Authorization', 'Bearer ' + user.accessToken),
        });
      }
    }
    return next.handle(request).pipe(
      tap((results) => {
        if (results instanceof HttpResponse) {
          if (results.body.errors && results.body.errors[0].extensions.code === 'UNAUTHENTICATED') {
            this.router.navigate(['/auth/login']);
          }
        }
      }),
      catchError((error: any) => {
        if (error.status === 401) {
          // return this.handle401Error(request, next);
          this.router.navigate(['/auth/login']);
        }
        return throwError(error);
      })
    );
  }
}
