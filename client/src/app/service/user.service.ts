import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {User} from '../entity/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = 'http://localhost:8080/users';

  constructor(private httpClient: HttpClient) {
  }

  getById(id: number): Observable<User> {
    const url = `${this.baseUrl}/${id}`;
    return this.httpClient.get<User>(url);
  }

  getCurrentLogged(): Observable<User> {
    const url = `${this.baseUrl}`;
    return this.httpClient.get<User>(url);
  }

  getUsersByTeamId(id: any): Observable<User[]> {
    const url = `${this.baseUrl}/by-team-id/${id}`;
    return this.httpClient.get<User[]>(url);
  }

  getByUsername(username: string): Observable<User> {
    const url = `${this.baseUrl}/by-username/${username}`;
    return this.httpClient.get<User>(url);
  }

  deleteCurrentLogged(password: string): Observable<any> {
    const url = `${this.baseUrl}/currentLogged`;
    return this.httpClient.request('delete', url, {body: password});
  }

  updateProfile(user: Partial<User>): Observable<any> {
    const url = `${this.baseUrl}/profile`;
    return this.httpClient.patch(url, user);
  }

  updatePassword(userId: number, currentPassword: string, newPassword: string): Observable<any> {
    const url = `${this.baseUrl}/password`;
    return this.httpClient.patch(url, {userId, currentPassword, newPassword});
  }
}

