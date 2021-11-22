import {MemberRole} from './member-role.enum';
import {User} from './user';
import {Team} from './team';

export interface MembershipBase {
  id: number;
  memberFrom: Date;
  memberRole: MemberRole;
}

export interface Membership extends MembershipBase {
  userId: number;
  teamId: number;
}

export interface Membership extends MembershipBase {
  user: User;
  team: Team;
}
