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
      content: 'test1',
      link: 'test1'
    },
    {
      content: 'test2',
      link: 'test2'
    },
    {
      content: 'test2',
      link: 'test3'
    }
  ]
};

export const teamsNavContent: NavObject = {
  title: 'TEAMS',
  elements: [
    {content: 'MY TEAMS', link: 'my-teams'},
    {content: 'ADD TEAM', link: 'add-team'},
    {content: 'JOIN TEAM', link: 'join-team'}
  ]
};
