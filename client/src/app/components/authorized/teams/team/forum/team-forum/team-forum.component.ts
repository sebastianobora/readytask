import {Component, Input, OnInit} from '@angular/core';
import {TeamForumPostService} from '../../../../../../service/team-forum-post.service';
import {Observable} from 'rxjs';
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
  posts!: Observable<TeamForumPost[]>;

  constructor(private teamForumPostService: TeamForumPostService,
              private teamService: TeamService) {
  }

  ngOnInit(): void {
    this.loadPosts();
    this.getCurrentTeam();
  }

  getCurrentTeam(): void{
    this.teamService.getTeam(this.teamId).subscribe(
      team => this.team = team
    );
  }

  loadPosts(): void{
    this.posts = this.teamForumPostService.getPostsByTeamId(this.teamId);
  }
}
