import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import {TeamService} from '../../../../service/team.service';
import {UserService} from '../../../../service/user.service';
import {Task} from '../../../../entity/task';
import {TaskService} from '../../../../service/task.service';
import {Router} from '@angular/router';
import {MemberRole} from '../../../../entity/member-role.enum';
import {Team} from '../../../../entity/team';
import {Observable} from 'rxjs';
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
  teamsManagedByUser: Observable<Team[]>;
  usersFromPickedTeam?: Observable<User[]>;

  selectedTeam?: Team;
  selectedUser?: User;

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
    this.teamsManagedByUser = this.getTeamsManagedByUser();
  }

  ngOnInit(): void {
  }

  getTeamsManagedByUser(): Observable<Team[]> {
    return this.teamService.getLoggedUserTeams()
      .pipe(map(teams => this.filterTeamsByAdminRole(teams)));
  }

  setUsersFromPickedTeam(): void {
    console.log('dziala');
    this.usersFromPickedTeam = this.userService.getUsersByTeamId(this.selectedTeam?.id);
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


  getEditorValue(): string {
    return this.taskForm.controls.description.value;
  }

  saveTask(): void {
    this.task.description = this.getEditorValue();
  }

  handlePickDateDialog(): void {
    // this.task.deadline = deadline;
    this.addTaskAndRedirect(this.task as Task);
  }
}
