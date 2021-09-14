import {Component, Input, OnInit} from '@angular/core';
import {TeamForumPostService} from '../../../../../service/team-forum-post.service';
import {Observable} from 'rxjs';
import {TeamForumPost} from '../../../../../entity/team-forum-post';

@Component({
  selector: 'app-team-forum',
  templateUrl: './team-forum.component.html',
  styleUrls: ['./team-forum.component.css']
})
export class TeamForumComponent implements OnInit {
  @Input()
  teamId!: string;
  posts!: Observable<TeamForumPost[]>;
  lengthLimit = 290;
  isExpanded = false;
  expandMessage = 'Show more';
  isEditable = false;
  panelOpenState = false;

  constructor(private teamForumPostService: TeamForumPostService) {
  }

  ngOnInit(): void {
    this.posts = this.teamForumPostService.getPostsByTeamId(this.teamId);
  }

  toggleExpand(): void {
    this.expandMessage = this.isExpanded ? 'Show more' : 'Show less';
    this.isExpanded = !this.isExpanded;
  }

  toggleEditable(): void {
    this.isEditable = !this.isEditable;
  }
}
