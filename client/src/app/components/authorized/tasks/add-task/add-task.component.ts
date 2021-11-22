import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {TeamService} from '../../../../service/team.service';
import {UserService} from '../../../../service/user.service';
import {Task} from '../../../../entity/task';
import {TaskService} from '../../../../service/task.service';
import {Router} from '@angular/router';
import {MemberRole} from '../../../../entity/member-role.enum';
import {Team} from '../../../../entity/team';
import {Observable} from 'rxjs';
import {User} from '../../../../entity/user';
import {SafeHtml} from '@angular/platform-browser';
import {map} from 'rxjs/operators';
import {MarkdownService} from '../../../../service/markdown.service';
import {NotifierService} from '../../../../service/notifier.service';
import {StepperOrientation} from '@angular/cdk/stepper';
import {BreakpointObserver} from '@angular/cdk/layout';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css', '../../../../../assets/markdown.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AddTaskComponent implements OnInit {
  previewMode = false;
  minDeadline: Date;
  maxDeadline: Date;
  teamsManagedByUser: Observable<Team[]>;
  usersFromSelectedTeam?: Observable<User[]>;
  stepperOrientation: Observable<StepperOrientation>;
  task: Partial<Task> = {};

  constructor(private teamService: TeamService,
              private userService: UserService,
              private taskService: TaskService,
              private markdownService: MarkdownService,
              private notifierService: NotifierService,
              private router: Router,
              private breakpointObserver: BreakpointObserver) {
    this.teamsManagedByUser = this.getTeamsManagedByUser();
    this.stepperOrientation = this.getStepperOrientation();
    this.minDeadline = this.getMinDeadline();
    this.maxDeadline = this.getMaxDeadline();
  }

  ngOnInit(): void {
  }

  getMinDeadline(): Date {
    return new Date();
  }

  getMaxDeadline(): Date {
    const date = this.getMinDeadline();
    date.setMonth(date.getMonth() + 3);
    return date;
  }

  getStepperOrientation(): Observable<StepperOrientation> {
    return this.breakpointObserver
      .observe('(min-width: 1090px)')
      .pipe(map(({matches}) => (matches ? 'horizontal' : 'vertical')));
  }

  getTeamsManagedByUser(): Observable<Team[]> {
    return this.teamService.getLoggedUserTeams()
      .pipe(map(teams => this.filterTeamsByAdminRole(teams)));
  }

  filterTeamsByAdminRole(teams: Team[]): Team[] {
    return teams.filter(team => team.membership.memberRole === MemberRole.ADMIN);
  }

  setUsersFromPickedTeam(): void {
    const id = this.task?.teamId;
    if (id) {
      this.usersFromSelectedTeam = this.userService.getUsersByTeamId(id);
    }
  }

  markdownToHtml(markdownText: string): SafeHtml {
    return this.markdownService.markdownToHtml(markdownText);
  }

  saveTaskAndRedirect(): void {
    this.taskService.addTask(this.task as Task)
      .subscribe(task => {
        this.successfulNotify();
        this.taskService.redirectToTask(task.id);
      });
  }

  successfulNotify(): void {
    const message = this.task.title + 'task has been added';
    this.notifierService.notify(message, 'success');
  }
}
