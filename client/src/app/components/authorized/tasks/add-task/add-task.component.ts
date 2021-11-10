import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import {PickTeamDialogComponent} from './add-task-dialogs/pick-team-dialog/pick-team-dialog.component';
import {TeamService} from '../../../../service/team.service';
import {UserService} from '../../../../service/user.service';
import {PickUserDialogComponent} from './add-task-dialogs/pick-user-dialog/pick-user-dialog.component';
import {Task} from '../../../../entity/task';
import {PickDateDialogComponent} from './add-task-dialogs/pick-date-dialog/pick-date-dialog.component';
import {TaskService} from '../../../../service/task.service';
import {Router} from '@angular/router';
import {MemberRole} from '../../../../entity/member-role.enum';
import {Team} from '../../../../entity/team';
import {Observable} from 'rxjs';
import {ComponentType} from '@angular/cdk/overlay';
import {User} from '../../../../entity/user';
import * as marked from 'marked';
import {DomSanitizer} from '@angular/platform-browser';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {
  teams: Observable<Team[]> = this.teamService.getTeams().pipe(
    map(teams => this.filterTeamsByAdminRole(teams)));
  selectedTeam: Team | undefined;
  task: Partial<Task> = {};
  taskForm: FormGroup = new FormGroup({
    title: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required)
  });

  constructor(public dialog: MatDialog,
              private teamService: TeamService,
              private userService: UserService,
              private taskService: TaskService,
              private router: Router,
              private sanitizer: DomSanitizer) {
  }

  ngOnInit(): void {
  }

  markdownToHtml(markdownText: string): string {
    return this.sanitizer.bypassSecurityTrustHtml(marked.parse(markdownText)) as string;
  }

  addTaskAndRedirect(task: Task): void {
    task.title = 'title';
    this.taskService.addTask(task).subscribe(res => {
        const url = '/tasks/task/' + res.id;
        this.router.navigate([url]);
      }
    );
  }

  filterTeamsByAdminRole(teams: Team[]): Team[] {
    return teams.filter(team => team.membership.memberRole === MemberRole.ADMIN);
  }

  getDialogAfterClosed(component: ComponentType<any>, injectedData?: any): Observable<any> {
    return this.dialog.open(component, {data: injectedData, disableClose: true}).afterClosed();
  }

  getEditorValue(): string {
    return this.taskForm.controls.description.value;
  }

  onSubmit(): void {
    this.task.description = this.getEditorValue();
    this.teamService.getTeams().subscribe(teams => {
      teams = this.filterTeamsByAdminRole(teams);
      this.handlePickTeamDialog(teams);
    });
  }

  handlePickTeamDialog(teams: Team[]): void {
    this.getDialogAfterClosed(PickTeamDialogComponent, teams).subscribe(team => {
      this.task.teamId = team.id;
      this.userService.getUsersByTeamId(team?.id).subscribe(users => {
        this.handlePickUserDialog(users);
      });
    });
  }

  handlePickUserDialog(users: User[]): void {
    this.getDialogAfterClosed(PickUserDialogComponent, users).subscribe(user => {
      this.task.userAssignedToTaskId = user.id;
      this.handlePickDateDialog();
    });
  }

  handlePickDateDialog(): void {
    this.getDialogAfterClosed(PickDateDialogComponent).subscribe(deadline => {
      this.task.deadline = deadline;
      this.addTaskAndRedirect(this.task as Task);
    });
  }
}
