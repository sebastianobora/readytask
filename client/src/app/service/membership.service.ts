import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Membership} from '../entity/membership';

@Injectable({
  providedIn: 'root'
})
export class MembershipService {

  private url = 'http://localhost:8080/memberships';
  constructor(private httpClient: HttpClient) { }

  getByTeamId(id: number): Observable<Membership>{
    return this.httpClient.get<Membership>(`${this.url}/getByTeamId/${id}`);
  }
}
