import {Component, OnInit} from '@angular/core';
import {Team} from '../../../../entity/team';
import {TeamService} from '../../../../service/team.service';
import {Router} from '@angular/router';
import {NotifierService} from '../../../../service/notifier.service';

@Component({
  selector: 'app-add-team',
  templateUrl: './add-team.component.html',
  styleUrls: ['../team-manager.css']
})
export class AddTeamComponent implements OnInit {
  team: Partial<Team> = {};

  constructor(private teamService: TeamService,
              private router: Router,
              private notifierService: NotifierService) {
  }

  ngOnInit(): void {
  }

  addTeam(): void {
    this.teamService.addTeam(this.team as Team).subscribe(
      team => {
        this.teamService.redirectToTeamDetails(team.id);
        this.notifierService.notify(`${this.team.name} has been created successfully!`, 'success');
      }
    );
  }
}
