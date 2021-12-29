import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Todo} from '../../../entity/todo';
import {TodoService} from '../../../service/todo.service';
import {NotifierService} from '../../../service/notifier.service';
import {ConfirmationService} from '../../../service/confirmation.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {
  todos?: Observable<Todo[]>;
  selectedTodo?: Todo;
  newTodo: Partial<Todo> = {};
  editedContent?: string;
  maxTodoLength = 50;

  constructor(private todoService: TodoService,
              private notifierService: NotifierService,
              private confirmationService: ConfirmationService) {
  }

  ngOnInit(): void {
    this.loadTodos();
  }

  loadTodos(): void {
    this.todos = this.todoService.getTodos();
  }

  confirmChanges(): void {
    if (this.selectedTodo && this.editedContent) {
      this.selectedTodo.content = this.editedContent;
      this.todoService.putTodo(this.selectedTodo).subscribe();
      this.selectedTodo = undefined;
    }
  }

  add(): void {
    this.todoService.addTodo(this.newTodo as Todo).subscribe(
      () => {
        this.loadTodos();
      },
      () => {
      },
      () => {
        this.newTodo = {};
      }
    );
  }

  edit(todo: Todo): void {
    this.selectedTodo = todo;
    this.editedContent = this.selectedTodo.content;
  }

  cancelEdit(): void {
    this.selectedTodo = {} as Todo;
  }

  confirmAndDelete(todo: Todo): void {
    this.confirmationService.confirm(() => this.delete(todo));
  }

  delete(todo: Todo): void {
    this.todoService.deleteTodo(todo.id).subscribe(
      () => this.notifierService.notify('Todo has been deleted!', 'success'),
      () => this.notifierService.notify('Todo cannot be deleted!', 'error'),
      () => this.loadTodos()
    );
  }
}
