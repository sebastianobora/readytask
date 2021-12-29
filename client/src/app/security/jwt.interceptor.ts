import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AuthService} from './auth.service';
import {TOKEN_HEADER_NAME} from '../../assets/authrorization-utils';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.authService.getToken();
    const tokenType = this.authService.getTokenType();
    const isTokenExpired = this.authService.isTokenExpired();

    if (token && tokenType && !isTokenExpired) {
      request = request.clone({
        headers: request.headers.set(TOKEN_HEADER_NAME, tokenType + token)
      });
    }
    return next.handle(request);
  }
}
