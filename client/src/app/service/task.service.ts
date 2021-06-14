import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Task} from '../entity/task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private url = 'http://localhost:8080/tasks';

  constructor(private httpClient: HttpClient) {
  }

  getTask(id: string): Observable<Task> {
    return this.httpClient.get<Task>(`${this.url}/${id}`);
  }

  addTask(task: Task): Observable<Task> {
    return this.httpClient.post<Task>(this.url, task);
  }
}
