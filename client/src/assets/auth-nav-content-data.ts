export interface NavObject {
  title: string;
  elements: NavElementObject[];
}

export interface NavElementObject{
  content: string;
  link: string;
}

export const todoNavContent: NavObject = {
  title: 'TODO',
  elements: []
};

export const tasksNavContent: NavObject = {
  title: 'TASKS',
  elements: [
    {
      content: 'ADD TASK',
      link: 'tasks/add-task'
    }
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
