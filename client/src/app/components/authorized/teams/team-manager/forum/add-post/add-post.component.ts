import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {TeamForumPost} from '../../../../../../entity/team-forum-post';
import {TeamForumPostService} from '../../../../../../service/team-forum-post.service';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css']
})
export class AddPostComponent implements OnInit {
  @Input() teamId!: string;
  @Output() addPostEvent = new EventEmitter();
  postMinLength = 10;
  postMaxLength = 2500;
  newPostMessage = new FormControl(null, [Validators.required,
    Validators.minLength(this.postMinLength),
    Validators.maxLength(this.postMaxLength)]);

  constructor(private teamForumPostService: TeamForumPostService) {
  }

  ngOnInit(): void {
  }

  addPost(): void {
    const newPost: Partial<TeamForumPost> = {message: this.newPostMessage.value, teamId: Number(this.teamId)};
    this.teamForumPostService.add(newPost as TeamForumPost).subscribe(
      () => {
        this.addPostEvent.emit();
      },
      () => {
      },
      () => {
        this.newPostMessage.reset();
      }
    );
  }

}
