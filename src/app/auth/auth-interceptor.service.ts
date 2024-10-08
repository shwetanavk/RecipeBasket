import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpParams,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { exhaustMap, Observable, take } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class AuthInterceptorService implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.authService.user.pipe(
      take(1),
      exhaustMap((user) => {
        // if (!user) {
        return next.handle(req);
        //     }
        //     const modifiedRequest = req.clone({
        //       params: new HttpParams().set('auth', user.token),
        //     });
        //     return next.handle(modifiedRequest);
      })
    );
    throw new Error('Method not implemented.');
  }
}
