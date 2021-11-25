import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Membership, MembershipExtended} from '../entity/membership';
import {MemberRole} from '../entity/member-role.enum';

@Injectable({
  providedIn: 'root'
})
export class MembershipService {

  private url = 'http://localhost:8080/memberships';

  constructor(private httpClient: HttpClient) {
  }

  getAmountOfAdminRoleMembersByTeamId(teamId: string): Observable<number> {
    return this.httpClient.get<number>(`${this.url}/get-amount-of-admin-role-members-by-team-id/${teamId}`);
  }

  getLoggedUserMembershipByTeamId(id: number | string): Observable<Membership>;
  getLoggedUserMembershipByTeamId(id: number | string, extended: true): Observable<MembershipExtended>;
  getLoggedUserMembershipByTeamId(id: number | string, extended: boolean = false): Observable<Membership | MembershipExtended> {
    const url = `${this.url}/user/logged/team/${id}?extended=${extended}`;
    return this.httpClient.get<Membership | MembershipExtended>(url);
  }

  getMembershipsByTeamId(id: string | number, extended: true): Observable<MembershipExtended[]>;
  getMembershipsByTeamId(id: string | number): Observable<Membership[]>;
  getMembershipsByTeamId(id: string | number, extended: boolean = false): Observable<Membership[] | MembershipExtended[]> {
    const url = `${this.url}/team-id/${id}?extended=${extended}`;
    return this.httpClient.get<Membership[] | MembershipExtended[]>(url);
  }

  addByTeamCode(code: string): Observable<Membership> {
    return this.httpClient.post<Membership>(`${this.url}/add-by-code/${code}`, null);
  }

  updateMembership(id: string | number, role: MemberRole): Observable<Membership> {
    const roleObj: Partial<Membership> = {memberRole: role};
    return this.httpClient.patch<Membership>(`${this.url}/membership/${id}`, roleObj);
  }

  delete(membershipId: number): Observable<any> {
    return this.httpClient.delete(`${this.url}/${membershipId}`);
  }
}
