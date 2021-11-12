import {TaskState} from './task-state.enum';
import {User} from './user';
import {Team} from './team';

interface TaskBase {
  id: number;
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
