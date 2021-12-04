import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Membership, MembershipExtended, PagedMembershipsExtended} from '../entity/membership';
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
  getLoggedUserMembershipByTeamId(id: number | string, options: { extended: true }): Observable<MembershipExtended>;
  getLoggedUserMembershipByTeamId(id: number | string, options: { extended: boolean } = {extended: false}): Observable<Membership | MembershipExtended> {
    const url = `${this.url}/user/logged/team/${id}?extended=${options.extended}`;
    return this.httpClient.get<Membership | MembershipExtended>(url);
  }

  getMembershipsByTeamId(id: string | number): Observable<Membership[]>;
  getMembershipsByTeamId(id: string | number, extended: true): Observable<MembershipExtended[]>;
  getMembershipsByTeamId(id: string | number, extended: boolean = false): Observable<Membership[] | MembershipExtended[]> {
    const url = `${this.url}/team-id/${id}?extended=${extended}`;
    return this.httpClient.get<Membership[] | MembershipExtended[]>(url);
  }

  getPagedMembershipsByTeamId(teamId: string | number, page: number): Observable<PagedMembershipsExtended> {
    const url = `${this.url}/paged/team/${teamId}?extended=true&page=${page}`;
    return this.httpClient.get<PagedMembershipsExtended>(url);
  }

  getPagedLoggedUserMemberships(page: number): Observable<PagedMembershipsExtended> {
    const url = `${this.url}/paged/user/logged?extended=true&page=${page}`;
    return this.httpClient.get<PagedMembershipsExtended>(url);
  }

  getLoggedUserMemberships(): Observable<Membership[]>;

  getLoggedUserMemberships(options: { extended: true }): Observable<MembershipExtended[]>;

  getLoggedUserMemberships(options: { extended: boolean } = {extended: false}): Observable<Membership[] | MembershipExtended[]> {
    const url = `${this.url}/user/logged?extended=${options.extended}`;
    return this.httpClient.get<Membership[] | MembershipExtended[]>(url);
  }

  addByTeamCode(code: string): Observable<Membership> {
    const url = `${this.url}/add-by-code/${code}`;
    return this.httpClient.post<Membership>(url, null);
  }

  updateMembership(id: string | number, role: MemberRole): Observable<Membership> {
    const roleObj: Partial<Membership> = {memberRole: role};
    return this.httpClient.patch<Membership>(`${this.url}/membership/${id}`, roleObj);
  }

  delete(membershipId: number): Observable<any> {
    return this.httpClient.delete(`${this.url}/${membershipId}`);
  }
}
