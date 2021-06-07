import {Membership} from './membership';

export interface Team {
  id: number;
  code: string;
  name: string;
  createdAt: Date;
  img: string;
  membership: Membership;
}
