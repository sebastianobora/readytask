import {TaskState} from './task-state.enum';
import {User} from './user';
import {Team} from './team';
import {UUID} from '../../assets/uuid-type';

interface TaskBase {
  id: UUID;
  title: string;
  description: string;
  deadline: Date;
  createdAt: Date;
  state: TaskState;
}

export interface Task extends TaskBase {
  userAssignedToTaskId: number;
  authorOfTaskId: number;
  teamId: number;
}

export interface TaskExtended extends TaskBase {
  userAssignedToTask: User;
  authorOfTask: User;
  team: Team;
}

export interface PagedTasksExtended {
  content: TaskExtended[],
  number: number,
  totalElements: number,
  size: number
}
