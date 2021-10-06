import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {myProfileNavContent, NavObject, tasksNavContent, teamsNavContent, todoNavContent} from '../../../../assets/auth-nav-content-data';
import {User} from '../../../entity/user';

@Component({
  selector: 'app-auth-nav',
  templateUrl: './auth-nav.component.html',
  styleUrls: ['./auth-nav.component.css']
})
export class AuthNavComponent implements OnInit {
  @Input()
  currentUser?: Partial<User>;
  currentNavContent?: NavObject;
  currentPath: string | undefined;
  navContent = new Map([
    ['todo', todoNavContent],
    ['tasks', tasksNavContent],
    ['teams', teamsNavContent],
    ['my-profile', myProfileNavContent]
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

  setCurrentNavContent(path: string): void {
    this.currentNavContent = this.navContent.get(path);
  }
}
