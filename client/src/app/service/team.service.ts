import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {forkJoin, Observable} from 'rxjs';
import {Team} from '../entity/team';
import {map, mergeMap, switchMap} from 'rxjs/operators';
import {MembershipService} from './membership.service';

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  private url = 'http://localhost:8080/teams';
  constructor(private httpClient: HttpClient,
              private membershipService: MembershipService) { }
  getTeam(id: string): Observable<Team>{
    return this.httpClient.get<Team>(`${this.url}/${id}`).pipe(
      switchMap(team => {
        return this.membershipService.getByTeamId(team.id).pipe(
          map(membership => {
            team.membership = membership;
            return team;
          })
        );
      })
    );
  }
  getTeams(): Observable<Team[]>{
    return this.httpClient.get<Team[]>(this.url).pipe(
      mergeMap(teams => {
        return forkJoin(
          teams.map(team => {
            return this.membershipService.getByTeamId(team.id).pipe(
              map(membership => {
                team.membership = membership;
                return team;
              }));
          }));
      }));
  }

  addTeam(team: Team): Observable<Team>{
    return this.httpClient.post<Team>(this.url, team);
  }

  deleteTeam(id: number): Observable<any>{
    return this.httpClient.delete(this.url + '/' + id);
  }
}
