import {Component, HostBinding, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Router} from '@angular/router';
import {
  Nav,
  profileNavContent,
  publicProfileLink,
  tasksNavContent,
  teamsNavContent,
  todoNavContent
} from '../../../../assets/auth-nav-content-data';
import {User} from '../../../entity/user';
import {BreakpointObserver} from '@angular/cdk/layout';
import {UserService} from '../../../service/user.service';

@Component({
  selector: 'app-auth-nav',
  templateUrl: './auth-nav.component.html',
  styleUrls: ['./auth-nav.component.css']
})
export class AuthNavComponent implements OnInit, OnChanges {
  @HostBinding('class.minimized') minimized = false;
  @Input() currentUser?: User;
  currentNavContent?: Nav;
  currentPath?: string;
  navContent = new Map([
    ['todo', todoNavContent],
    ['tasks', tasksNavContent],
    ['teams', teamsNavContent],
    ['profile', profileNavContent]
  ]);

  constructor(public userService: UserService,
              private router: Router,
              private breakpointObserver: BreakpointObserver) {
    this.getPathAndSetCurrentNavContent();
    this.maximizeNavAtMobileBreakpoint();
  }

  ngOnInit(): void {
  }

  getPathAndSetCurrentNavContent(): void {
    this.router.events.subscribe(() => {
      const path = this.router.url.split('/')[1];
      if (this.currentPath !== path) {
        this.currentPath = path;
        this.currentNavContent = this.navContent.get(path);
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

  minimizeNav(): void {
    this.minimized = true;
  }

  maximize() {
    this.minimized = false;
  }
}
