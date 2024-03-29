import {Component, OnInit} from '@angular/core';
import {Location} from '@angular/common';
import {Team} from '../../../../entity/team';
import {Observable} from 'rxjs';
import {TeamService} from '../../../../service/team.service';
import {ActivatedRoute, Router} from '@angular/router';
import {MemberRole} from '../../../../entity/member-role.enum';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit {
  adminRole: MemberRole = MemberRole.ADMIN;
  team: Observable<Team> | undefined;
  tooltipMessage = 'Copy team code';

  constructor(
    private location: Location,
    private teamService: TeamService,
    private route: ActivatedRoute,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.team = this.teamService.getTeam(id);
    }
  }

  goBack(): void {
    this.location.back();
  }

  delete(team: Team): void {
    this.teamService.deleteTeam(team.id).subscribe(
      () => {
        const url = '/teams/my-teams/';
        this.router.navigate([url]);
      }
    );
  }
}
