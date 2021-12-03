import {Component, Input, OnInit} from '@angular/core';
import {TaskExtended} from '../../../../entity/task';
import {TaskStateDataMap} from '../../../../../assets/TaskStateDataMap';
import {TaskService} from '../../../../service/task.service';
import {TeamService} from '../../../../service/team.service';

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
  copyTaskRefMessage = 'Copy task reference';

  constructor(public taskService: TaskService,
              public teamService: TeamService) {
  }

  ngOnInit(): void {
  }

}
