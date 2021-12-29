import {Component, Input, OnInit} from '@angular/core';
import {MembershipExtended, PagedMembershipsExtended} from '../../../../../entity/membership';
import {MembershipService} from '../../../../../service/membership.service';
import {TeamService} from '../../../../../service/team.service';
import {MemberRole} from '../../../../../entity/member-role.enum';
import {MatTableDataSource} from '@angular/material/table';
import {FormControl} from '@angular/forms';
import {NotifierService} from '../../../../../service/notifier.service';
import {UserService} from '../../../../../service/user.service';
import {ConfirmationService} from '../../../../../service/confirmation.service';

@Component({
  selector: 'app-participants',
  templateUrl: './participants.component.html',
  styleUrls: ['./participants.component.css']
})
export class ParticipantsComponent implements OnInit {
  @Input() teamId!: string;
  loggedUserMembership?: MembershipExtended;
  membershipsPage?: PagedMembershipsExtended;
  participantsDataSource = new MatTableDataSource<MembershipExtended>();
  memberRole = MemberRole;
  selectedMembership = new FormControl();
  selectedRole = new FormControl();
  columns: string[] = [];
  participantCols = ['memberDetails', 'memberFrom', 'userRole'];
  adminCols = ['changeRole', 'deleteMember'];

  constructor(public userService: UserService,
              private membershipService: MembershipService,
              private confirmationService: ConfirmationService,
              private teamService: TeamService,
              private notifierService: NotifierService) {
    this.participantsDataSource.filterPredicate = (membership: MembershipExtended, filter: string) => {
      return `${membership.user.firstName} ${membership.user.lastName}`.toLowerCase().includes(filter);
    };
  }

  ngOnInit(): void {
    this.getLoggedUserMembershipAndSetTableColumns();
    this.loadMembershipData();
  }

  getLoggedUserMembershipAndSetTableColumns(): void {
    this.membershipService.getLoggedUserMembershipByTeamId(this.teamId, {extended: true}).subscribe(
      membership => {
        this.loggedUserMembership = membership;
        this.setTableColumns(membership);
      }
    );
  }

  setTableColumns(membership: MembershipExtended): void {
    switch (membership.memberRole) {
      case MemberRole.ADMIN:
        this.columns = this.participantCols.concat(this.adminCols);
        break;
      case MemberRole.PARTICIPANT:
        this.columns = this.participantCols;
        break;
    }
  }

  loadMembershipData(page: number = 0): void {
    this.membershipService.getPagedMembershipsByTeamId(this.teamId, page)
      .subscribe(membershipsPage => {
        this.participantsDataSource.data = membershipsPage.content;
        this.membershipsPage = membershipsPage;
      });
  }

  edit(membership: MembershipExtended): void {
    this.selectedRole.reset();
    this.selectedMembership.setValue(membership);
  }

  isMemberAdmin(membership: MembershipExtended): boolean {
    return membership.memberRole === MemberRole.ADMIN;
  }

  isItCurrentUserMembership(membership: MembershipExtended): boolean {
    return this.loggedUserMembership?.id === membership.id;
  }

  isRoleEditable(membership: MembershipExtended): boolean {
    return this.selectedMembership.value?.id === membership.id;
  }

  confirmChanges(): void {
    if (this.selectedMembership.value && this.selectedRole.value) {
      this.membershipService.updateMembership(this.selectedMembership.value.id, this.selectedRole.value)
        .subscribe(() => {
            const message = this.buildSuccessChangedRoleMessage(this.selectedMembership.value);
            this.notifierService.notify(message, 'success');
          },
          () => {
            const message = `Role cannot be changed!`;
            this.notifierService.notify(message, 'error');
          },
          () => {
            this.selectedMembership.reset();
            this.selectedRole.reset();
          });
    }
  }

  buildSuccessChangedRoleMessage(membership: MembershipExtended): string {
    const name = membership.user.firstName;
    const surname = membership.user.lastName;
    const role = this.selectedRole.value.toLowerCase();
    return `${name} ${surname} role has been changed to ${role}.`;
  }

  cancelChanges(): void {
    this.selectedMembership.reset();
  }

  confirmAndDeleteMembership(membership: MembershipExtended) {
    this.confirmationService.confirm(() => this.deleteMembership(membership));
  }

  deleteMembership(membership: MembershipExtended): void {
    this.membershipService.delete(membership.id).subscribe(
      () => {
        const name = membership.user.firstName;
        const surname = membership.user.lastName;
        const message = `${name} ${surname} has been removed from ${this.loggedUserMembership?.team.name} team.`;
        this.notifierService.notify(message, 'success');
        this.loadMembershipData();
      });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.participantsDataSource.filter = filterValue.trim().toLowerCase();
  }
}
