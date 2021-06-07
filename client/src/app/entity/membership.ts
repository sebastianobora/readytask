import {MemberRole} from './member-role.enum';

export interface Membership {
  id: number;
  memberFrom: Date;
  memberRole: MemberRole;
  userId: number;
  teamId: number;
}
