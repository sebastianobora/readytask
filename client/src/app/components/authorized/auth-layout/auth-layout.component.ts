import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {UserService} from '../../../service/user.service';
import {User} from '../../../entity/user';
import {FooterComponent} from '../../common/footer/footer.component';
import {LayoutService} from '../../../service/layout.service';
import {LoggedUserService} from '../../../service/logged-user.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-auth-layout',
  templateUrl: './auth-layout.component.html',
  styleUrls: ['./auth-layout.component.css'],
  providers: [LoggedUserService]
})
export class AuthLayoutComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild(FooterComponent, {read: ElementRef}) footerEl!: ElementRef;
  public currentUser?: User;
  private authLayoutFooterClass = 'auth-layout-footer';
  private loggedUserSubscription = new Subscription();

  constructor(private userService: UserService,
              private layoutService: LayoutService,
              private loggedUserService: LoggedUserService) {
  }

  ngOnInit(): void {
    this.setCurrentUser();
  }

  setCurrentUser(): void {
    this.loggedUserSubscription = this.loggedUserService.loggedUser
      .subscribe(user => this.currentUser = user);
  }

  ngAfterViewInit(): void {
    this.layoutService.addFooterClass(this.footerEl, this.authLayoutFooterClass);
  }

  ngOnDestroy(): void {
    this.loggedUserSubscription.unsubscribe();
    this.layoutService.removeFooterClass(this.footerEl, this.authLayoutFooterClass);
  }
}
