export interface NavObject {
  title: string;
  elements: NavElementObject[];
}

export interface NavElementObject {
  content: string;
  link: string;
}

export const todoNavContent: NavObject = {
  title: 'TODO',
  elements: [
    {content: 'MY TODOS', link: 'todo/my-todos'}
  ]
};

export const tasksNavContent: NavObject = {
  title: 'TASKS',
  elements: [
    {content: 'MY TASKS', link: 'tasks/my-tasks'},
    {content: 'ADD TASK', link: 'tasks/add-task'}
  ]
};

export const teamsNavContent: NavObject = {
  title: 'TEAMS',
  elements: [
    {content: 'MY TEAMS', link: 'teams/my-teams'},
    {content: 'ADD TEAM', link: 'teams/add-team'},
    {content: 'JOIN TEAM', link: 'teams/join-team'}
  ]
};

export const publicProfileLink = 'profile/public/';
export const profileNavContent: NavObject = {
  title: 'PROFILE',
  elements: [
    {content: 'PUBLIC PROFILE', link: ''},
    {content: 'MANAGE PROFILE', link: 'profile/manage-profile'},
    {content: 'PHOTO', link: 'profile/change-photo'},
    {content: 'ACCOUNT', link: 'profile/account'},
    {content: 'CLOSE ACCOUNT', link: 'profile/close-account'}
  ]
};
