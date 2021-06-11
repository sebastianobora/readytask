import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {ROLES, TOKEN, TOKEN_TYPE} from '../../assets/authrorization-utils';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url = 'http://localhost:8080/authentication';

  constructor(private httpClient: HttpClient) { }

  public login(username: string, password: string): Observable<any>{
    return this.httpClient.post<any>(`${this.url}/login`, {username, password})
      .pipe(
        map(res => {
          this.saveTokenInWebStorage(res.token);
          this.saveTokenType(res.tokenType);
          this.saveRolesInWebStorage(res.roles);
        })
      );
  }

  public register(email: string, username: string, password: string, firstName: string, lastName: string): Observable<any>{
    return this.httpClient.post<any>(`${this.url}/register`, {email, username, password, firstName, lastName});
  }

  saveTokenInWebStorage(token: string): void{
    localStorage.setItem(TOKEN, token);
  }

  saveTokenType(tokenType: string): void{
    localStorage.setItem(TOKEN_TYPE, tokenType);
  }

  saveRolesInWebStorage(roles: []): void{
    localStorage.setItem(ROLES, JSON.stringify(roles));
  }

  getToken(): string | null{
    return localStorage.getItem(TOKEN);
  }

  getTokenType(): string | null {
    return localStorage.getItem(TOKEN_TYPE);
  }
}
