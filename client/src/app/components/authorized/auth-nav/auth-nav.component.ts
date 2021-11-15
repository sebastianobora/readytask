import {Component, HostBinding, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Router} from '@angular/router';
import {
  NavObject,
  profileNavContent,
  publicProfileLink,
  tasksNavContent,
  teamsNavContent,
  todoNavContent
} from '../../../../assets/auth-nav-content-data';
import {User} from '../../../entity/user';
import {BreakpointObserver} from '@angular/cdk/layout';

@Component({
  selector: 'app-auth-nav',
  templateUrl: './auth-nav.component.html',
  styleUrls: ['./auth-nav.component.css']
})
export class AuthNavComponent implements OnInit, OnChanges {
  @HostBinding('class.minimized') minimized = false;
  @Input() currentUser?: User;
  currentNavContent?: NavObject;
  currentPath?: string;
  navContent = new Map([
    ['todo', todoNavContent],
    ['tasks', tasksNavContent],
    ['teams', teamsNavContent],
    ['profile', profileNavContent]
  ]);

  constructor(private router: Router,
              private breakpointObserver: BreakpointObserver) {
    this.getPathAndSetCurrentNavContent();
    this.maximizeNavAtMobileBreakpoint();
  }

  ngOnInit(): void {
  }

  getPathAndSetCurrentNavContent() {
    this.router.events.subscribe(() => {
      const path = this.router.url.split('/')[1];
      if (this.currentPath !== path) {
        this.currentPath = path;
        this.setCurrentNavContent(this.currentPath);
      }
    });
  }

  maximizeNavAtMobileBreakpoint(): void {
    this.breakpointObserver
      .observe('(max-width: 667px)')
      .subscribe(() => this.maximize());
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
    profileNavContentWithUsername.elements[0].link = publicProfileLink + username;
    this.navContent.set('profile', profileNavContentWithUsername);
  }

  setCurrentNavContent(path: string): void {
    this.currentNavContent = this.navContent.get(path);
  }

  minimizeNav(): void {
    this.minimized = true;
  }

  maximize() {
    this.minimized = false;
  }
}
