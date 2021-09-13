import {Component, Input, OnInit} from '@angular/core';
import {Membership} from '../../../../../entity/membership';
import {MembershipService} from '../../../../../service/membership.service';
import {TeamService} from '../../../../../service/team.service';
import {Team} from '../../../../../entity/team';
import {MemberRole} from '../../../../../entity/member-role.enum';
import {MatTableDataSource} from '@angular/material/table';
import {FormControl} from '@angular/forms';
import {NotifierService} from '../../../../../service/notifier.service';

@Component({
  selector: 'app-participants',
  templateUrl: './participants.component.html',
  styleUrls: ['./participants.component.css']
})
export class ParticipantsComponent implements OnInit {
  @Input()
  teamId!: string;
  team?: Team;
  memberRole = MemberRole;
  participantsDataSource = new MatTableDataSource<Membership>();
  selectedMembership = new FormControl();
  selectedRole = new FormControl();
  testUser = {name : 'Sebastian', surname: 'Obora'};
  testMembership = {role: 'krol', user : this.testUser};

  columns: string[] = [];
  participantCols = ['img', 'firstName', 'lastName', 'memberFrom', 'userRole'];
  adminCols = ['changeRole', 'deleteMember'];


  constructor(private membershipService: MembershipService,
              private teamService: TeamService,
              private notifierService: NotifierService) { }

  ngOnInit(): void {
    console.log(JSON.stringify(this.testMembership));
    this.teamService.getTeam(this.teamId).subscribe(team => {
      this.team = team;
      switch (team.membership.memberRole){
        case MemberRole.ADMIN:
          this.columns = this.participantCols.concat(this.adminCols);
          break;
        case MemberRole.PARTICIPANT:
          this.columns = this.participantCols;
          break;
      }
    });
    this.loadMembershipData(this.teamId);
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    console.log(filterValue.trim().toLowerCase());
    this.participantsDataSource.filter = filterValue.trim().toLowerCase();
  }

  loadMembershipData(teamId: string): void {
    this.membershipService.getMembershipsByTeamId(teamId).subscribe(
      memberships => {
        this.participantsDataSource.data = memberships;
      }
    );
  }

  edit(membership: Membership): void {
    this.selectedRole.reset();
    this.selectedMembership.setValue(membership);
  }

  isMemberAdmin(membership: Membership): boolean {
    return membership.memberRole === MemberRole.ADMIN;
  }

  isItCurrentUserMembership(membership: Membership): boolean{
    return this.team?.membership.id === membership.id;
  }

  isRoleEditable(membership: Membership): boolean {
    return this.selectedMembership.value === membership;
  }

  confirmChanges(): void {
    if (this.selectedMembership.value && this.selectedRole.value){
      this.selectedMembership.value.memberRole = this.selectedRole.value;
      this.membershipService.updateMembership(this.selectedMembership.value).subscribe(
      membership => {
          const name = this.selectedMembership.value.user.firstName;
          const surname = this.selectedMembership.value.user.lastName;
          const role = membership.memberRole.toLowerCase();
          const message = `${name} ${surname} role has been changed to ${role}.`;
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

  cancelChanges(): void {
    this.selectedMembership.reset();
  }

  deleteMembership(membership: Membership): void {
    this.membershipService.delete(membership.id).subscribe(
      () => {
        const name = membership.user.firstName;
        const surname = membership.user.lastName;
        const message = `${name} ${surname} has been removed from ${this.team?.name} team.`;
        this.notifierService.notify(message, 'success');
        this.loadMembershipData(this.teamId);
      });
  }
}
