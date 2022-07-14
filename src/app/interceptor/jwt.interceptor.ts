import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private AuthService: AuthService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = this.AuthService.getToken();
    if (token) {
      // If we have a token, we set it to the header
      req = req.clone({
        setHeaders: { Authorization: ` Bearer  ${token}` },
      });
      // console.log('token from inceptor', token);
    }

    return next.handle(req).pipe(
      catchError((err) => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 401) {
            localStorage.clear()
            // redirect user to the logout page
          }
        }
        return throwError(err);
      })
    );
  }
}
