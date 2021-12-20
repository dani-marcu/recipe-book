import { Injectable } from '@angular/core';
import {
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const user = this.authService.user.value;
    if (!user) {
      return next.handle(req);
    }
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + user.token,
    });
    const modifiedReq = req.clone({ headers });
    return next.handle(modifiedReq);
  }
}
