import {Component, OnInit} from '@angular/core';
import {MembershipService} from '../../../../service/membership.service';
import {Router} from '@angular/router';
import {NotifierService} from '../../../../service/notifier.service';

@Component({
  selector: 'app-join-team',
  templateUrl: './join-team.component.html',
  styleUrls: ['../team-manager.css']
})
export class JoinTeamComponent implements OnInit {
  teamDoesNotExistsMessage = 'Team with passed code does not exists!';
  userIsAlreadyMember = 'You are already member of the team!';
  code = '';

  constructor(private membershipService: MembershipService,
              private router: Router,
              private notifierService: NotifierService) {
  }

  ngOnInit(): void {
  }

  addMembership(code: string): void {
    this.membershipService.addByTeamCode(code).subscribe(
      membership => this.router.navigate(['/teams/team/' + membership.teamId]),
      (err) => {
        if (err.status === 404) {
          this.notifierService.notify(this.teamDoesNotExistsMessage, 'error');
        } else if (err.status === 409) {
          this.notifierService.notify(this.userIsAlreadyMember, 'error');
        }
      });
  }
}
