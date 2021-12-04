import {Component, OnInit} from '@angular/core';
import {TeamService} from '../../../../service/team.service';
import {MemberRole} from '../../../../entity/member-role.enum';
import {PagedMembershipsExtended} from '../../../../entity/membership';
import {MembershipService} from '../../../../service/membership.service';
import {finalize} from 'rxjs/operators';

@Component({
  selector: 'app-teams-list',
  templateUrl: './teams-list.component.html',
  styleUrls: ['./teams-list.component.css']
})
export class TeamsListComponent implements OnInit {
  membershipsPage?: PagedMembershipsExtended;
  adminRole: MemberRole = MemberRole.ADMIN;
  isLoading = false;

  constructor(public teamService: TeamService,
              private membershipService: MembershipService) {
  }

  ngOnInit(): void {
    this.loadMembershipsPage();
  }

  loadMembershipsPage(page: number = 0): void {
    this.isLoading = true;
    this.membershipService.getPagedLoggedUserMemberships(page)
      .pipe(finalize(() => this.isLoading = false))
      .subscribe(membershipsPage => this.membershipsPage = membershipsPage);
  }
}
