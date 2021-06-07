import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Team} from '../../../../entity/team';
import {TeamService} from '../../../../service/team.service';
import {MemberRole} from '../../../../entity/member-role.enum';

@Component({
  selector: 'app-teams-list',
  templateUrl: './teams-list.component.html',
  styleUrls: ['./teams-list.component.css']
})
export class TeamsListComponent implements OnInit {
  adminRole: MemberRole = MemberRole.ADMIN;
  teams: Observable<Team[]> = this.teamService.getTeams();

  constructor(private teamService: TeamService) { }

  ngOnInit(): void {
  }
  getCapitalizedFirstLetterOfName(name: string): string{
    return name.charAt(0).toUpperCase();
  }
}
