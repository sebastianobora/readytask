import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ResourceStatistics} from '../entity/resource-statistics';

@Injectable({
  providedIn: 'root'
})
export class ReactionService {
  private baseUrl = 'http://localhost:8080/social-resource-reaction';

  constructor(private httpClient: HttpClient) {
  }

  getPostStatistics(postId: number): Observable<ResourceStatistics> {
    const url = this.baseUrl + '/post-statistics/' + postId;
    return this.httpClient.get<ResourceStatistics>(url);
  }

  addLikeToPost(postId: number): Observable<ResourceStatistics> {
    const url = this.baseUrl + '/like-post/' + postId;
    return this.httpClient.post<ResourceStatistics>(url, null);
  }

  addDislikeToPost(postId: number): Observable<ResourceStatistics> {
    const url = this.baseUrl + '/dislike-post/' + postId;
    return this.httpClient.post<ResourceStatistics>(url, null);
  }

  swapPostReaction(postId: number): Observable<ResourceStatistics> {
    const url = this.baseUrl + '/swap-post-reaction/' + postId;
    return this.httpClient.put<ResourceStatistics>(url, null);
  }

  removeReactionFromPost(postId: number): Observable<ResourceStatistics> {
    const url = this.baseUrl + '/' + postId;
    return this.httpClient.delete<ResourceStatistics>(url);
  }
}
