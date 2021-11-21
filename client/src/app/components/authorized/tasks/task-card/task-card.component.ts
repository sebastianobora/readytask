import {Component, Input, OnInit} from '@angular/core';
import {TaskExtended} from '../../../../entity/task';
import {TaskStateDataMap} from '../../../../../assets/TaskStateDataMap';
import {TaskService} from '../../../../service/task.service';

@Component({
  selector: 'app-task-card',
  templateUrl: './task-card.component.html',
  styleUrls: ['./task-card.component.css']
})
export class TaskCardComponent implements OnInit {
  @Input() task!: TaskExtended;
  taskStateDataMap = TaskStateDataMap;
  deadlineTooltip = 'Deadline';
  createdAtTooltip = 'Created at';

  constructor(public taskService: TaskService) {
  }

  ngOnInit(): void {
  }

}
