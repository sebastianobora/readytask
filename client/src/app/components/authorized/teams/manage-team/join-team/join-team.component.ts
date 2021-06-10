import { Component, OnInit } from '@angular/core';
import {MembershipService} from '../../../../../service/membership.service';
import {Membership} from '../../../../../entity/membership';
import {Router} from '@angular/router';

@Component({
  selector: 'app-join-team',
  templateUrl: './join-team.component.html',
  styleUrls: ['../manage-team-form.css']
})
export class JoinTeamComponent implements OnInit {
  code = '';
  membership: Partial<Membership> = {};
  constructor(private membershipService: MembershipService,
              private router: Router) { }

  ngOnInit(): void {
  }

  addMembership(code: string): void{
    this.membershipService.addByTeamCode(code, this.membership as Membership).subscribe(
      res => {
        const url = '/teams/team/' + res.teamId;
        this.router.navigate([url]);
      }
    );
  }
}
