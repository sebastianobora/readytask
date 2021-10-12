import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Router} from '@angular/router';
import {NavObject, profileNavContent, tasksNavContent, teamsNavContent, todoNavContent} from '../../../../assets/auth-nav-content-data';
import {User} from '../../../entity/user';

@Component({
  selector: 'app-auth-nav',
  templateUrl: './auth-nav.component.html',
  styleUrls: ['./auth-nav.component.css']
})
export class AuthNavComponent implements OnInit, OnChanges {
  @Input() currentUser?: User;
  currentNavContent?: NavObject;
  currentPath?: string;
  navContent = new Map([
    ['todo', todoNavContent],
    ['tasks', tasksNavContent],
    ['teams', teamsNavContent],
    ['profile', profileNavContent]
  ]);

  constructor(private router: Router) {
    this.router.events.subscribe(() => {
      const path = this.router.url.split('/')[1];
      if (this.currentPath !== path) {
        this.currentPath = path;
        this.setCurrentNavContent(this.currentPath);
      }
    });
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    const currentUserKey = 'currentUser';
    const username = changes[currentUserKey]?.currentValue?.username;
    const usernameDifferentThanPrevious = username !== changes[currentUserKey].previousValue;
    if (username && usernameDifferentThanPrevious) {
      this.addUsernameToPublicProfileLink(username);
    }
  }

  addUsernameToPublicProfileLink(username: string): void {
    const profileNavContentWithUsername = profileNavContent;
    profileNavContentWithUsername.elements[0].link += username;
    this.navContent.set('profile', profileNavContentWithUsername);
  }

  setCurrentNavContent(path: string): void {
    this.currentNavContent = this.navContent.get(path);
  }
}
