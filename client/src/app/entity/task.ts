import {TaskState} from './task-state.enum';

export interface Task {
  id: number;
  title: string;
  description: string;
  deadline: Date;
  createdAt: Date;
  state: TaskState;
  userAssignedToTaskId: number;
  authorOfTaskId: number;
  teamId: number;
}
