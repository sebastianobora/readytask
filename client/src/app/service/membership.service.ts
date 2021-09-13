import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {forkJoin, Observable} from 'rxjs';
import {Membership} from '../entity/membership';
import {map, mergeMap} from 'rxjs/operators';
import {UserService} from './user.service';

@Injectable({
  providedIn: 'root'
})
export class MembershipService {

  private url = 'http://localhost:8080/memberships';

  constructor(private httpClient: HttpClient,
              private userService: UserService) {
  }

  getAmountOfAdminRoleMembersByTeamId(teamId: string): Observable<number>{
    return this.httpClient.get<number>(`${this.url}/get-amount-of-admin-role-members-by-team-id/${teamId}`);
  }

  getByTeamId(id: number): Observable<Membership> {
    return this.httpClient.get<Membership>(`${this.url}/getByTeamId/${id}`);
  }

  getMembershipsByTeamId(id: string): Observable<Membership[]> {
    return this.httpClient.get<Membership[]>(`${this.url}/get-memberships-by-team-id/${id}`).pipe(
      mergeMap(memberships => {
        return forkJoin(
          memberships.map(membership => {
            return this.userService.getById(membership.userId).pipe(
              map(user => {
                membership.user = user;
                return membership;
              }));
          }));
      }));
  }

  addByTeamCode(code: string): Observable<Membership> {
    return this.httpClient.post<Membership>(`${this.url}/add-by-code/${code}`, null);
  }

  updateMembership(membership: Membership): Observable<Membership> {
    return this.httpClient.put<Membership>(`${this.url}/update-membership`, membership);
  }

  delete(membershipId: number): Observable<any> {
    return this.httpClient.delete(`${this.url}/${membershipId}`);
  }
}
