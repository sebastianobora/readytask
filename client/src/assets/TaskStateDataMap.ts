import {TaskState} from '../app/entity/task-state.enum';

interface TaskStateData {
  taskStateLabel: string;
  backgroundClassName: string;
  borderClassName: string;
}

export const TaskStateDataMap = new Map<string, TaskStateData>([
  [TaskState.NEW, {
    taskStateLabel: 'New',
    backgroundClassName: 'task-new',
    borderClassName: 'task-new-border'
  }],
  [TaskState.IN_PROGRESS, {
    taskStateLabel: 'In progress',
    backgroundClassName: 'task-in-progress',
    borderClassName: 'task-in-progress-border'
  }],
  [TaskState.TO_REVIEW, {
    taskStateLabel: 'To review',
    backgroundClassName: 'task-to-review',
    borderClassName: 'task-to-review-border'
  }],
  [TaskState.TO_FIX, {
    taskStateLabel: 'To fix',
    backgroundClassName: 'task-to-fix',
    borderClassName: 'task-to-fix-border'
  }],
  [TaskState.FINISHED, {
    taskStateLabel: 'Finished',
    backgroundClassName: 'task-finished',
    borderClassName: 'task-finished-border'
  }],
  [TaskState.ARCHIVED, {
    taskStateLabel: 'Archived',
    backgroundClassName: 'task-archived',
    borderClassName: 'task-archived-border'
  }]
]);
