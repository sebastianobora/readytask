import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Task, TaskExtended} from '../entity/task';
import {UUID} from '../../assets/uuid-type';
import {TaskState} from '../entity/task-state.enum';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private url = 'http://localhost:8080/tasks';

  constructor(private httpClient: HttpClient,
              private router: Router) {
  }

  getTasksAssignedToUser(extended: true | false = false): Observable<TaskExtended[]> {
    const url = `${this.url}/user-assigned-to/current-logged?extended=${extended}`;
    return this.httpClient.get<TaskExtended[]>(url);
  }

  getTasksAssignedToUserByTeamId(id: string | number, options = {extended: false}) {
    const url = `${this.url}/`;
  }

  getTask(id: string | number): Observable<Task>
  getTask(id: string | number, options: { extended: true }): Observable<TaskExtended>
  getTask(id: string | number, options = {extended: false}): Observable<Task | TaskExtended> {
    const url = `${this.url}/${id}?extended=${options.extended}`;
    return this.httpClient.get<Task | TaskExtended>(url);
  }


  addTask(task: Task): Observable<Task> {
    return this.httpClient.post<Task>(this.url, task);
  }

  changeState(taskId: UUID, state: TaskState): Observable<any> {
    const url = `${this.url}/state/${taskId}`;
    const task: Partial<Task> = {state: state};
    return this.httpClient.patch<any>(url, task);
  }

  delete(taskId: UUID): Observable<any> {
    const url = `${this.url}/task/${taskId}`;
    return this.httpClient.delete<any>(url);
  }

  redirectToTask(id: string): void {
    const url = '/tasks/task/' + id;
    this.router.navigate([url]);
  }
}
