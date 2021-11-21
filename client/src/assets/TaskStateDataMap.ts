import {TaskState} from '../app/entity/task-state.enum';

interface TaskStateData {
  taskStateLabel: string;
  taskStateClassName: string;
}

export const TaskStateDataMap = new Map<string, TaskStateData>([
  [TaskState.NEW, {taskStateLabel: 'New', taskStateClassName: 'task-new'}],
  [TaskState.IN_PROGRESS, {taskStateLabel: 'In progress', taskStateClassName: 'task-in-progress'}],
  [TaskState.TO_REVIEW, {taskStateLabel: 'To review', taskStateClassName: 'task-to-review'}],
  [TaskState.TO_FIX, {taskStateLabel: 'To fix', taskStateClassName: 'task-to-fix'}],
  [TaskState.FINISHED, {taskStateLabel: 'Finished', taskStateClassName: 'task-finished'}],
  [TaskState.ARCHIVED, {taskStateLabel: 'Archived', taskStateClassName: 'task-archived'}]
]);
