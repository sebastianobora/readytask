import {Component, Input, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Team} from '../../../../../entity/team';
import {MemberRole} from '../../../../../entity/member-role.enum';
import {Router} from '@angular/router';
import {NotifierService} from '../../../../../service/notifier.service';
import {ConfirmationService} from '../../../../../service/confirmation.service';
import {TeamService} from '../../../../../service/team.service';
import {MembershipService} from '../../../../../service/membership.service';

@Component({
  selector: 'app-team-details',
  templateUrl: './team-details.component.html',
  styleUrls: ['./team-details.component.css']
})
export class TeamDetailsComponent implements OnInit {
  @Input()
  teamId?: string | null;
  memberRole = MemberRole;
  copyCodeTooltipMessage = 'Copy team code';
  cannotLeaveTeamTooltipMessage = 'You are only admin role member, you cannot leave the team!';
  deleteLeaveRedirectUrl = '/teams/my-teams/';
  team?: Observable<Team>;
  numberOfAdminRoleMembers?: number;

  constructor(private router: Router,
              private notifierService: NotifierService,
              private confirmationService: ConfirmationService,
              private teamService: TeamService,
              private membershipService: MembershipService) { }

  ngOnInit(): void {
    if (this.teamId) {
      this.team = this.teamService.getTeam(this.teamId);
      this.membershipService.getAmountOfAdminRoleMembersByTeamId(this.teamId).subscribe(
        numberOfAdminRoleMembers => {
          this.numberOfAdminRoleMembers = numberOfAdminRoleMembers;
        }
      );
    }
  }

  showCopyNotification(): void{
    this.notifierService.notify('Code has been copied.', 'success');
  }

  confirmAndDelete(team: Team): void {
    this.confirmationService.isConfirmed(() => this.delete(team));
  }

  delete(team: Team): void{
    this.teamService.deleteTeam(team.id).subscribe(
      () => {
        this.router.navigate([this.deleteLeaveRedirectUrl]);
        this.notifierService.notify('Team has been deleted successfully!', 'success');
      }
    );
  }

  confirmAndLeave(team: Team): void{
    this.confirmationService.isConfirmed(() => this.leave(team));
  }

  leave(team: Team): void {
    this.membershipService.delete(team.membership.id).subscribe(
      () => {
        this.router.navigate([this.deleteLeaveRedirectUrl]);
        this.notifierService.notify(`You have successfully left the ${team.name} team`, 'success');
      }
    );
  }

  hasMemberAdminRole(team: Team): boolean{
    return team.membership.memberRole === MemberRole.ADMIN;
  }

  isLeaveTeamPossible(numberOfAdminRoleMembers: number): boolean {
    return numberOfAdminRoleMembers > 1;
  }
}
