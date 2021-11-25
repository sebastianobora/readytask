import {Component, OnInit} from '@angular/core';
import {Location} from '@angular/common';
import {ActivatedRoute, Router} from '@angular/router';
import {TeamService} from '../../../../../service/team.service';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit {
  teamId!: string;

  constructor(
    private location: Location,
    private route: ActivatedRoute,
    private teamService: TeamService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    const teamId = this.route.snapshot.paramMap.get('id');
    if (teamId) {
      this.teamId = teamId;
      this.teamService.getTeam(teamId).subscribe(() => {
      }, () => this.router.navigate(['teams/my-teams']));
    }
  }
}
