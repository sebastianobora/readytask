import {Component, OnInit} from '@angular/core';
import {MembershipService} from '../../../../service/membership.service';
import {Router} from '@angular/router';
import {NotifierService} from '../../../../service/notifier.service';

@Component({
  selector: 'app-join-team',
  templateUrl: './join-team.component.html',
  styleUrls: ['../manage-team-form.css']
})
export class JoinTeamComponent implements OnInit {
  code = '';

  constructor(private membershipService: MembershipService,
              private router: Router,
              private notifierService: NotifierService) {
  }

  ngOnInit(): void {
  }

  addMembership(code: string): void {
    this.membershipService.addByTeamCode(code).subscribe(
      res => {
        const url = '/teams/team/' + res.teamId;
        this.router.navigate([url]);
      },
      () => {
        this.notifierService.notify('Team with passed code doesn\'t exists!', 'error');
      }
    );
  }
}
