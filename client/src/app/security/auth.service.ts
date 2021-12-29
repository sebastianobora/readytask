import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {ROLES, TOKEN, TOKEN_TYPE} from '../../assets/authrorization-utils';
import {JwtHelperService} from '@auth0/angular-jwt';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url = 'http://localhost:8080/authentication';

  constructor(private httpClient: HttpClient,
              private router: Router) {
  }

  public login(username: string, password: string): Observable<any> {
    return this.httpClient.post<any>(`${this.url}/login`, {username, password})
      .pipe(
        map(res => {
          this.saveTokenDataAndRoleInLocalStorage(res.token, res.tokenType, res.roles);
        })
      );
  }

  public register(email: string, username: string, password: string, firstName: string, lastName: string): Observable<any> {
    return this.httpClient.post<any>(`${this.url}/register`, {email, username, password, firstName, lastName});
  }

  logout(): void {
    this.removeTokenDataAndRoleFromWebStorage();
    this.router.navigate(['']);
  }

  saveTokenDataAndRoleInLocalStorage(token: string, tokenType: string, roles: []): void {
    localStorage.setItem(TOKEN, token);
    localStorage.setItem(TOKEN_TYPE, tokenType);
    localStorage.setItem(ROLES, JSON.stringify(roles));
  }

  removeTokenDataAndRoleFromWebStorage(): void {
    localStorage.removeItem(TOKEN);
    localStorage.removeItem(TOKEN_TYPE);
    localStorage.removeItem(ROLES);
  }

  getToken(): string | null {
    return localStorage.getItem(TOKEN);
  }

  getTokenType(): string | null {
    return localStorage.getItem(TOKEN_TYPE);
  }

  isTokenExpired(): boolean {
    const jwtHelperService = new JwtHelperService();
    const token = this.getToken();
    if (token) {
      return jwtHelperService.isTokenExpired(token);
    }
    return true;
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    const tokenType = this.getTokenType();
    return !!(token && tokenType && !this.isTokenExpired());
  }
}
