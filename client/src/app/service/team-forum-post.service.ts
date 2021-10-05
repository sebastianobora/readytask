import {Injectable} from '@angular/core';
import {forkJoin, Observable} from 'rxjs';
import {TeamForumPost} from '../entity/team-forum-post';
import {HttpClient} from '@angular/common/http';
import {map, mergeMap} from 'rxjs/operators';
import {UserService} from './user.service';
import {ReactionService} from './reaction.service';

@Injectable({
  providedIn: 'root'
})
export class TeamForumPostService {
  private baseUrl = 'http://localhost:8080/team-forum-post';

  constructor(private httpClient: HttpClient,
              private userService: UserService,
              private reactionService: ReactionService) {
  }

  getPostsByTeamId(teamId: string): Observable<TeamForumPost[]> {
    const url = `${this.baseUrl}/by-team-id/${teamId}`;
    return this.httpClient.get<TeamForumPost[]>(url).pipe(
      mergeMap(posts => {
        return forkJoin(
          posts.map(post => {
            return this.userService.getById(post.userId).pipe(
              map(user => {
                post.user = user;
                return post;
              }));
          }));
      }),
      mergeMap(posts => {
        return forkJoin(
          posts.map(post => {
            return this.reactionService.getPostStatistics(post.id).pipe(
              map(statistics => {
                post.resourceStatistics = statistics;
                return post;
              }));
          }));
      }));
  }

  add(newPost: TeamForumPost): Observable<TeamForumPost> {
    return this.httpClient.post<TeamForumPost>(`${this.baseUrl}`, newPost);
  }

  deleteById(post: TeamForumPost): Observable<any> {
    return this.httpClient.delete(`${this.baseUrl}/${post.id}`);
  }

  update(post: TeamForumPost): Observable<TeamForumPost> {
    return this.httpClient.put<TeamForumPost>(`${this.baseUrl}`, post);
  }
}
