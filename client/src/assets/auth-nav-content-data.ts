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
  elements: [
    {
      content: 'ALL',
      link: 'all'
    },
    {
      content: 'TODAY',
      link: 'today'
    },
    {
      content: 'LAST WEEK',
      link: 'last-week'
    },
    {
      content: 'LAST MONTH',
      link: 'last-month'
    }
  ]
};

export const tasksNavContent: NavObject = {
  title: 'TODO',
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
      link: ''
    }
  ]
};
