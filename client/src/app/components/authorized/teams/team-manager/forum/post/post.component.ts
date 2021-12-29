import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {TeamForumPost} from '../../../../../../entity/team-forum-post';
import {TeamForumPostService} from '../../../../../../service/team-forum-post.service';
import {NotifierService} from '../../../../../../service/notifier.service';
import {ConfirmationService} from '../../../../../../service/confirmation.service';
import {Team} from '../../../../../../entity/team';
import {MemberRole} from '../../../../../../entity/member-role.enum';
import {FormControl} from '@angular/forms';
import {ReactionService} from '../../../../../../service/reaction.service';
import {UserService} from '../../../../../../service/user.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  @Output() reloadPosts = new EventEmitter();
  @Input() post!: TeamForumPost;
  @Input() team!: Team;
  isExpanded = false;
  isEditable = false;
  isLiked: FormControl = new FormControl();
  postCollapsedLengthLimit = 290;
  expandMessage = 'Show more';
  successfulDeleteMessage = 'Post has been deleted successfully!';
  unsuccessfulDeleteMessage = 'Post can not be deleted!';
  successfulUpdateMessage = 'Post has been updated successfully!';

  constructor(public userService: UserService,
              private teamForumPostService: TeamForumPostService,
              private notifierService: NotifierService,
              private confirmationService: ConfirmationService,
              private reactionService: ReactionService) {
  }

  ngOnInit(): void {
    this.isLiked.setValue(this.post.resourceStatistics.isLiked);
  }

  confirmAndDeletePost(post: any): void {
    this.confirmationService.confirm(() => this.deletePost(post));
  }

  deletePost(post: TeamForumPost): void {
    this.teamForumPostService.deleteById(post).subscribe(
      () => {
        this.notifierService.notify(this.successfulDeleteMessage, 'success');
        this.reloadPosts.emit();
      },
      () => {
        this.notifierService.notify(this.unsuccessfulDeleteMessage, 'error');
      }
    );
  }

  toggleExpand(): void {
    this.expandMessage = this.isExpanded ? 'Show more' : 'Show less';
    this.isExpanded = !this.isExpanded;
  }

  toggleEditable(): void {
    this.isEditable = !this.isEditable;
    this.isExpanded = true;
    this.expandMessage = 'Show less';
  }

  isUserAuthor(post: TeamForumPost): boolean {
    return this.team.membership.userId === post.user.id;
  }

  isUserAdminOfTeam(): boolean {
    return this.team.membership.memberRole === MemberRole.ADMIN;
  }

  updatePost(post: TeamForumPost, message: HTMLParagraphElement): void {
    if (typeof message.textContent === 'string' && post.message.trim() !== message.textContent.trim()) {
      post.message = message.textContent;
      this.teamForumPostService.update(post).subscribe(
        () => {
          this.notifierService.notify(this.successfulUpdateMessage, 'success');
          this.reloadPosts.emit();
        }
      );
    } else {
      this.isEditable = false;
    }
  }

  react(type: 'like' | 'dislike'): void {
    const state = type === 'like';
    if (this.isLiked.value === state) {
      this.reactionService.removeReactionFromPost(this.post.id)
        .subscribe(stats => this.post.resourceStatistics = stats);
    } else if (typeof this.isLiked.value === 'boolean') {
      this.reactionService.swapPostReaction(this.post.id)
        .subscribe(stats => this.post.resourceStatistics = stats);
    } else {
      state ?
        this.reactionService.addLikeToPost(this.post.id)
          .subscribe(stats => this.post.resourceStatistics = stats) :
        this.reactionService.addDislikeToPost(this.post.id)
          .subscribe(stats => this.post.resourceStatistics = stats);
    }
    this.swapLikeFlag(state);
  }

  swapLikeFlag(state: boolean): void {
    this.isLiked.value === state ? this.isLiked.reset() : this.isLiked.setValue(state);
  }
}
