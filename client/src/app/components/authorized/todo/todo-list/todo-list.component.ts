import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {Todo} from '../../../../entity/todo';
import {TodoService} from '../../../../service/todo.service';
import {switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {
  todos: Observable<Todo[]> | undefined;
  selectedTodo: Todo | undefined;
  editedContent: string | undefined;
  newTodo: Partial<Todo> = {};
  constructor(private todoService: TodoService) {
  }


  ngOnInit(): void {
    this.getTodos();
  }
  getTodos(): void{
    this.todos = this.todoService.getTodos();
  }
  confirmChanges(): void{
    if (this.selectedTodo && this.editedContent) {
      this.selectedTodo.content = this.editedContent;
      this.todoService.putTodo(this.selectedTodo).subscribe();
      this.selectedTodo = undefined;
    }
  }

  add(): void{
    this.todoService.addTodo(this.newTodo as Todo).pipe(
      switchMap(() => this.todoService.getTodos())
    ).pipe(data => this.todos = data);
    this.newTodo = {};
  }

  edit(todo: Todo): void{
    this.selectedTodo = todo;
    this.editedContent = this.selectedTodo.content;
  }
  cancelEdit(): void{
    this.selectedTodo = undefined;
  }
  delete(todo: Todo): void{
    this.todoService.deleteTodo(todo.id).pipe(
      switchMap(() => this.todoService.getTodos())
    ).pipe(data => this.todos = data);
  }
}
