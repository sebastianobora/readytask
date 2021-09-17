import {Injectable} from '@angular/core';
import {forkJoin, Observable} from 'rxjs';
import {TeamForumPost} from '../entity/team-forum-post';
import {HttpClient} from '@angular/common/http';
import {map, mergeMap} from 'rxjs/operators';
import {UserService} from './user.service';

@Injectable({
  providedIn: 'root'
})
export class TeamForumPostService {
  private url = 'http://localhost:8080/team-forum-post';

  constructor(private httpClient: HttpClient,
              private userService: UserService) {
  }

  getPostsByTeamId(teamId: string): Observable<TeamForumPost[]> {
    return this.httpClient.get<TeamForumPost[]>(`${this.url}/by-team-id/${teamId}`).pipe(
        mergeMap(posts => {
            return forkJoin(
              posts.map(post => {
                return this.userService.getById(post.userId).pipe(
                  map(user => {
                    post.user = user;
                    return post;
                  })
                );
              }));
          }
        )
      );
  }

  add(newPost: TeamForumPost): Observable<TeamForumPost> {
    return this.httpClient.post<TeamForumPost>(`${this.url}`, newPost);
  }

  deleteById(post: TeamForumPost): Observable<any> {
    return this.httpClient.delete(`${this.url}/${post.id}`);
  }

  update(post: TeamForumPost): Observable<TeamForumPost> {
    return this.httpClient.put<TeamForumPost>(`${this.url}`, post);
  }
}
