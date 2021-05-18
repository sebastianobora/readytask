import { Component, OnInit } from '@angular/core';
import {ActivatedRoute } from '@angular/router';
import {NavObject, tasksNavContent, todoNavContent} from '../../../../assets/auth-nav-content-data';

@Component({
  selector: 'app-auth-nav',
  templateUrl: './auth-nav.component.html',
  styleUrls: ['./auth-nav.component.css']
})
export class AuthNavComponent implements OnInit {
  currentNavContent: NavObject | undefined;
  navContent = new Map([
    ['todo', todoNavContent],
    ['tasks', tasksNavContent]
  ]);
  constructor(private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.url.subscribe(url => {
      this.setCurrentNavContent(url[0].path);
    });
  }
  setCurrentNavContent(path: string): void{
    this.currentNavContent = this.navContent.get(path);
  }
}
