import {User} from './user';
import {Team} from './team';
import {ResourceStatistics} from './resource-statistics';

export interface TeamForumPost {
  id: number;
  message: string;
  creationTime: Date;
  updateTime: Date;
  user: User;
  team: Team;
  resourceStatistics: ResourceStatistics;
}

export interface TeamForumPost {
  id: number;
  message: string;
  creationTime: Date;
  updateTime: Date;
  userId: number;
  teamId: number;
}
