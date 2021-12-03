import {Component, OnInit} from '@angular/core';
import {TaskService} from '../../../../service/task.service';
import {Observable} from 'rxjs';
import {PagedTasksExtended} from '../../../../entity/task';
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
  tasksAssignedToUser?: PagedTasksExtended;
  tasksManagedByUser?: PagedTasksExtended;
  loggedUserMemberships?: Observable<MembershipExtended[]>;
  loggedUserAdminRoleMemberships?: Observable<MembershipExtended[]>;
  isLoading = false;

  constructor(private taskService: TaskService,
              private membershipService: MembershipService) {
  }

  ngOnInit(): void {
    this.setTasksAssignedToUser();
    this.setTasksManagedByUser();
    this.setLoggedUserMemberships();
    this.setLoggedUserAdminRoleMemberships();
  }

  setLoggedUserMemberships(): void {
    this.loggedUserMemberships = this.membershipService.getLoggedUserMemberships({extended: true});
  }

  setLoggedUserAdminRoleMemberships(): void {
    this.loggedUserAdminRoleMemberships = this.membershipService.getLoggedUserMemberships({extended: true})
      .pipe(map(memberships => memberships.filter(membership => membership.memberRole === MemberRole.ADMIN)));
  }

  setTasksAssignedToUser(teamId?: number, pageNumber: number = 0): void {
    const tasksSource = this.setTasksAssignedToUserSource(pageNumber, teamId);
    this.isLoading = true;
    tasksSource.subscribe(pagedTasks => {
      this.tasksAssignedToUser = pagedTasks;
      this.isLoading = false;
    });
  }

  setTasksAssignedToUserSource(pageNumber: number, teamId?: number): Observable<PagedTasksExtended> {
    if (teamId) {
      return this.taskService.getTasksAssignedToUserByTeamId(teamId, pageNumber);
    } else {
      return this.taskService.getPagedTasksAssignedToUser(pageNumber);
    }
  }

  setTasksManagedByUser(teamId?: number, pageNumber: number = 0): void {
    console.log(pageNumber);
    const tasksSource = this.setTasksManagedByUserSource(pageNumber, teamId);
    this.isLoading = true;
    tasksSource.subscribe(pagedTasks => {
      this.tasksManagedByUser = pagedTasks;
      this.isLoading = false;
    });
  }

  setTasksManagedByUserSource(pageNumber: number, teamId?: number): Observable<PagedTasksExtended> {
    if (teamId) {
      return this.taskService.getTasksManagedByUserByTeamId(teamId, pageNumber);
    } else {
      return this.taskService.getTasksManagedByUser(pageNumber);
    }
  }
}

