import { TestBed } from '@angular/core/testing';

import { TeamForumPostService } from './team-forum-post.service';

describe('TeamForumPostService', () => {
  let service: TeamForumPostService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TeamForumPostService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
