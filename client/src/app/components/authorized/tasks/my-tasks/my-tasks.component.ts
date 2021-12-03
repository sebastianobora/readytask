import {Component, OnInit} from '@angular/core';
import {TaskService} from '../../../../service/task.service';
import {Observable} from 'rxjs';
import {TaskExtended} from '../../../../entity/task';
import {MembershipExtended} from '../../../../entity/membership';
import {MembershipService} from '../../../../service/membership.service';
import {map} from 'rxjs/operators';
import {MemberRole} from '../../../../entity/member-role.enum';

@Component({
  selector: 'app-my-tasks',
  templateUrl: './my-tasks.component.html',
  styleUrls: ['./my-tasks.component.css']
})
export class MyTasksComponent implements OnInit {
  tasksAssignedToLoggedUser: Observable<TaskExtended[]>;
  tasksManagedByUser?: Observable<TaskExtended[]>;

  loggedUserMemberships?: Observable<MembershipExtended[]>;
  loggedUserAdminRoleMemberships?: Observable<MembershipExtended[]>;

  constructor(private taskService: TaskService,
              private membershipService: MembershipService) {
    this.tasksAssignedToLoggedUser = this.taskService.getTasksAssignedToUser(true);
    this.loggedUserMemberships = this.membershipService.getLoggedUserMemberships({extended: true});
    this.loggedUserAdminRoleMemberships = this.membershipService.getLoggedUserMemberships({extended: true})
      .pipe(map(memberships => memberships.filter(membership => membership.memberRole === MemberRole.ADMIN)));
  }

  ngOnInit(): void {
  }

  setTasksDependsOnSelectedTeam(teamId?: number): void {
    if (teamId) {
      this.tasksAssignedToLoggedUser = this.taskService.getTasksAssignedToUserByTeamId(teamId);
    } else {
      this.tasksAssignedToLoggedUser = this.taskService.getTasksAssignedToUser(true);
    }
  }

}
