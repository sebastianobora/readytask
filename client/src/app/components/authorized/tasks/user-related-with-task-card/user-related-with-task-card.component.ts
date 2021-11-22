import {Component, Input, OnInit} from '@angular/core';
import {User} from '../../../../entity/user';
import {Router} from '@angular/router';

@Component({
  selector: 'app-user-related-with-task-card[user][userDetailsMessage]',
  templateUrl: './user-related-with-task-card.component.html',
  styleUrls: ['./user-related-with-task-card.component.css']
})
export class UserRelatedWithTaskCardComponent implements OnInit {
  @Input() user!: User;
  @Input() userDetailsMessage!: 'Assigned to' | 'Assigned by';

  constructor(private router: Router) {
  }

  ngOnInit(): void {
  }

  redirectToProfileUrl(username: string): void {
    const profilePath = `profile/public/${username}`;
    this.router.navigate([profilePath]);
  }
}
