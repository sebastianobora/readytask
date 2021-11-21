import {Component, OnInit} from '@angular/core';
import {TaskService} from '../../../../service/task.service';
import {Observable} from 'rxjs';
import {TaskExtended} from '../../../../entity/task';

@Component({
  selector: 'app-my-tasks',
  templateUrl: './my-tasks.component.html',
  styleUrls: ['./my-tasks.component.css']
})
export class MyTasksComponent implements OnInit {
  tasksAssignedToLoggedUser?: Observable<TaskExtended[]>;

  constructor(private taskService: TaskService) {
    this.tasksAssignedToLoggedUser = this.taskService.getTasksAssignedToUser(true);
  }

  ngOnInit(): void {
  }

}
