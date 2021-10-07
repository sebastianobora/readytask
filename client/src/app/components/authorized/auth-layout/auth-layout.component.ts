import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {UserService} from '../../../service/user.service';
import {User} from '../../../entity/user';
import {FooterComponent} from '../../footer/footer.component';
import {LayoutService} from '../../../service/layout.service';

@Component({
  selector: 'app-auth-layout',
  templateUrl: './auth-layout.component.html',
  styleUrls: ['./auth-layout.component.css']
})
export class AuthLayoutComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild(FooterComponent, {read: ElementRef}) footerEl!: ElementRef;
  currentUser?: User;
  navEnabled = true;
  authLayoutFooterClass = 'auth-layout-footer';

  constructor(
    private userService: UserService,
    private layoutService: LayoutService
  ) {
  }

  ngOnInit(): void {
    this.setCurrentUser();
  }

  ngAfterViewInit(): void {
    this.layoutService.addFooterClass(this.footerEl, this.authLayoutFooterClass);
  }

  ngOnDestroy(): void {
    this.layoutService.removeFooterClass(this.footerEl, this.authLayoutFooterClass);
  }

  setCurrentUser(): void {
    this.userService.getCurrentUser().subscribe(user => {
      this.currentUser = user;
    });
  }
}
