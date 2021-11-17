import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Task, TaskExtended} from '../entity/task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private url = 'http://localhost:8080/tasks';

  constructor(private httpClient: HttpClient) {
  }

  getTask(id: string): Observable<TaskExtended> {
    return this.httpClient.get<TaskExtended>(`${this.url}/${id}?extended=true`);
  }

  addTask(task: Task): Observable<Task> {
    return this.httpClient.post<Task>(this.url, task);
  }
}
