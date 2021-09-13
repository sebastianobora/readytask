import {User} from './user';
import {Team} from './team';

export interface TeamForumPost{
  id: number;
  message: string;
  creationTime: Date;
  updateTime: Date;
  user: User;
  team: Team;
}

export interface TeamForumPost{
  id: number;
  message: string;
  creationTime: Date;
  updateTime: Date;
  userId: number;
  teamId: number;
}
