import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {User} from '../entity/user';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private url = 'http://localhost:8080/users';

  constructor(private httpClient: HttpClient,
              private router: Router) {
  }

  redirectToMyProfile(): void {
    this.router.navigate(['my-profile']);
  }

  getById(id: number): Observable<User> {
    return this.httpClient.get<User>(`${this.url}/${id}`);
  }

  getCurrentUser(): Observable<User> {
    return this.httpClient.get<User>(`${this.url}`);
  }

  getUsersByTeamId(id: any): Observable<User[]> {
    return this.httpClient.get<User[]>(`${this.url}/by-team-id/${id}`);
  }
}
