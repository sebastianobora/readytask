import {Component, Input, OnInit} from '@angular/core';
import {TeamForumPostService} from '../../../../../../service/team-forum-post.service';
import {TeamForumPost} from '../../../../../../entity/team-forum-post';
import {Team} from '../../../../../../entity/team';
import {TeamService} from '../../../../../../service/team.service';

@Component({
  selector: 'app-team-forum',
  templateUrl: './team-forum.component.html',
  styleUrls: ['./team-forum.component.css']
})
export class TeamForumComponent implements OnInit {
  @Input()
  teamId!: string;
  team!: Team;
  posts: TeamForumPost[] = [];
  isLoading!: boolean;

  constructor(private teamForumPostService: TeamForumPostService,
              private teamService: TeamService) {
  }

  ngOnInit(): void {
    this.loadPosts();
    this.getCurrentTeam();
  }

  getCurrentTeam(): void {
    this.teamService.getTeam(this.teamId).subscribe(
      team => this.team = team
    );
  }

  setLoader(state: true | false): void {
    this.isLoading = state;
  }

  clearPosts(): void {
    if (this.posts.length > 0) {
      this.posts.length = 0;
    }
  }

  loadPosts(): void {
    this.setLoader(true);
    this.clearPosts();
    this.teamForumPostService.getPostsByTeamId(this.teamId).subscribe(
      posts => {
        this.posts = posts;
      },
      () => {
      },
      () => {
        this.setLoader(false);
      }
    );
  }
}
