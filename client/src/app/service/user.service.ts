import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {User} from '../entity/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private url = 'http://localhost:8080/users';

  constructor(private httpClient: HttpClient) {
  }

  getCurrentUser(): Observable<User> {
    return this.httpClient.get<User>(`${this.url}`);
  }

  getUsersByTeamId(id: number): Observable<User[]> {
    return this.httpClient.get<User[]>(`${this.url}/by-team-id/${id}`);
  }
}
