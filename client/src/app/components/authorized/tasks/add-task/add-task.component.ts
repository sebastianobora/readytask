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
import * as marked from 'marked';
import {DomSanitizer, SafeHtml} from '@angular/platform-browser';
import {map} from 'rxjs/operators';

marked.setOptions({
  smartypants: true,
  smartLists: true
});

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css', './../../../../../assets/markdown-preview.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AddTaskComponent implements OnInit {
  previewMode: boolean = false;
  minDeadline: Date;
  maxDeadline: Date;
  teamsManagedByUser: Observable<Team[]>;
  usersFromSelectedTeam?: Observable<User[]>;
  task: Partial<Task> = {title: '', description: ''};

  constructor(private teamService: TeamService,
              private userService: UserService,
              private taskService: TaskService,
              private router: Router,
              private sanitizer: DomSanitizer) {
    this.teamsManagedByUser = this.getTeamsManagedByUser();
    this.minDeadline = this.getMinDeadline();
    this.maxDeadline = this.getMaxDeadline();
  }

  ngOnInit(): void {
  }

  getMinDeadline(): Date {
    const date = new Date();
    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();
    return new Date(year, month, day);
  }

  getMaxDeadline(): Date {
    const date = this.getMinDeadline();
    date.setMonth(date.getMonth() + 3);
    return date;
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
    return this.sanitizer.bypassSecurityTrustHtml(marked.parse(markdownText));
  }

  addTaskAndRedirect(task: Task): void {
    this.taskService.addTask(task).subscribe(res => {
        const url = '/tasks/task/' + res.id;
        this.router.navigate([url]);
      }
    );
  }
}
