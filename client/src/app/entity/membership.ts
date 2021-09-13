import {MemberRole} from './member-role.enum';
import {User} from './user';
import {Team} from './team';

export interface Membership {
  id: number;
  memberFrom: Date;
  memberRole: MemberRole;
  userId: number;
  teamId: number;
}

export interface Membership {
  id: number;
  memberFrom: Date;
  memberRole: MemberRole;
  user: User;
  team: Team;
}
