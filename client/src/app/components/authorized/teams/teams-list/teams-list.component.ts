import {Component, OnInit} from '@angular/core';
import {Team} from '../../../../entity/team';
import {TeamService} from '../../../../service/team.service';
import {MemberRole} from '../../../../entity/member-role.enum';

@Component({
  selector: 'app-teams-list',
  templateUrl: './teams-list.component.html',
  styleUrls: ['./teams-list.component.css']
})
export class TeamsListComponent implements OnInit {
  isLoading = true;
  adminRole: MemberRole = MemberRole.ADMIN;

  teams?: Team[];

  constructor(private teamService: TeamService) {
  }

  ngOnInit(): void {
    this.isLoading = true;
    this.teamService.getTeams().subscribe(data => {
        this.teams = data;
      },
      () => {
      },
      () => {
        this.isLoading = false;
      });
  }
}
