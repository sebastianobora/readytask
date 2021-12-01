import {Component, OnInit} from '@angular/core';
import {TaskService} from '../../../../service/task.service';
import {Observable} from 'rxjs';
import {TaskExtended} from '../../../../entity/task';
import {MembershipExtended} from '../../../../entity/membership';
import {MembershipService} from '../../../../service/membership.service';

@Component({
  selector: 'app-my-tasks',
  templateUrl: './my-tasks.component.html',
  styleUrls: ['./my-tasks.component.css']
})
export class MyTasksComponent implements OnInit {
  tasksAssignedToLoggedUser: Observable<TaskExtended[]>;
  loggedUserMemberships?: Observable<MembershipExtended[]>;

  constructor(private taskService: TaskService,
              private membershipService: MembershipService) {
    this.tasksAssignedToLoggedUser = this.taskService.getTasksAssignedToUser(true);
    this.loggedUserMemberships = this.membershipService.getLoggedUserMemberships({extended: true});
  }

  ngOnInit(): void {
  }

  setTasksDependsOnSelectedTeam(teamId: number) {
    // this.tasksAssignedToLoggedUser = this.taskService.
  }

}
