import {Component, Inject, OnDestroy, OnInit, Renderer2} from '@angular/core';
import {DOCUMENT} from '@angular/common';
import {UserService} from '../../../service/user.service';
import {User} from '../../../entity/user';

@Component({
  selector: 'app-auth-layout',
  templateUrl: './auth-layout.component.html',
  styleUrls: ['./auth-layout.component.css']
})
export class AuthLayoutComponent implements OnInit, OnDestroy {
  currentUser: Partial<User> | undefined;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private renderer: Renderer2,
    private userService: UserService
  ) {
  }

  ngOnInit(): void {
    this.getCurrentUser();
    this.renderer.addClass(this.document.getElementsByTagName('header')[0], 'auth-layout-header');
    this.renderer.addClass(this.document.body, 'auth-layout-background');
    this.renderer.addClass(this.document.getElementsByTagName('footer')[0], 'auth-layout-footer');
  }

  getCurrentUser(): void {
    this.userService.getCurrentUser().subscribe(data => {
      this.currentUser = data;
    });
  }

  ngOnDestroy(): void {
    this.renderer.removeClass(this.document.getElementsByTagName('header')[0], 'auth-layout-header');
    this.renderer.removeClass(this.document.body, 'auth-layout-background');
    this.renderer.removeClass(this.document.getElementsByTagName('footer')[0], 'auth-layout-footer');
  }
}
