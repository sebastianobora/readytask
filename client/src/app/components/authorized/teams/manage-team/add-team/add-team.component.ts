import {Component, OnInit} from '@angular/core';
import {Team} from '../../../../../entity/team';
import {TeamService} from '../../../../../service/team.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-add-team',
  templateUrl: './add-team.component.html',
  styleUrls: ['../manage-team-form.css']
})
export class AddTeamComponent implements OnInit {
  team: Partial<Team> = {};

  constructor(private teamService: TeamService,
              private router: Router) {
  }

  ngOnInit(): void {
  }

  addTeam(): void {
    this.teamService.addTeam(this.team as Team).subscribe(
      res => {
        const url = '/teams/team/' + res.id;
        this.router.navigate([url]);
      }
    );
  }
}
