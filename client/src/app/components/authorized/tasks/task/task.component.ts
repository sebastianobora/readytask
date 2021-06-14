import {Component, OnInit} from '@angular/core';
import {TaskService} from '../../../../service/task.service';
import {ActivatedRoute} from '@angular/router';
import {Task} from '../../../../entity/task';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {
  task: Observable<Task> | undefined;

  constructor(private taskService: TaskService,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.task = this.taskService.getTask(id);
    }
  }
}
