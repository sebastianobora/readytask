import {Component, Input, OnInit} from '@angular/core';
import {User} from '../../../../entity/user';
import {UserService} from '../../../../service/user.service';

@Component({
  selector: 'app-user-related-with-task-card[user][userDetailsMessage]',
  templateUrl: './user-related-with-task-card.component.html',
  styleUrls: ['./user-related-with-task-card.component.css']
})
export class UserRelatedWithTaskCardComponent implements OnInit {
  @Input() user!: User;
  @Input() userDetailsMessage!: 'Assigned to' | 'Assigned by';

  constructor(public userService: UserService) {
  }

  ngOnInit(): void {
  }
}
