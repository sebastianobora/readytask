import {Component, OnInit} from '@angular/core';
import {Team} from '../../../../entity/team';
import {TeamService} from '../../../../service/team.service';
import {Router} from '@angular/router';
import {NotifierService} from '../../../../service/notifier.service';

@Component({
  selector: 'app-add-team',
  templateUrl: './add-team.component.html',
  styleUrls: ['../manage-team-form.css']
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
      res => {
        const url = '/teams/team/' + res.id;
        this.router.navigate([url]);
        this.notifierService.notify(`${this.team.name} has been created successfully!`, 'success');
      }
    );
  }
}
