import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {Todo} from '../entity/todo';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private url = 'http://localhost:8080/todos';
  constructor(private httpClient: HttpClient) { }
  getTodos(): Observable<Todo[]>{
    return this.httpClient.get<Todo[]>(this.url);
  }

  addTodo(todo: Todo): Observable<Todo>{
    return this.httpClient.post<Todo>(this.url, todo);
  }
  putTodo(todo: Todo): Observable<Todo>{
    return this.httpClient.put<Todo>(this.url + '/' + todo.id, todo);
  }
  deleteTodo(id: number): Observable<any>{
    return this.httpClient.delete(this.url + '/' + id);
  }
}
