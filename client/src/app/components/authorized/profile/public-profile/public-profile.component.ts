import {Component, OnDestroy, OnInit} from '@angular/core';
import {UserService} from '../../../../service/user.service';
import {User} from '../../../../entity/user';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-public-profile',
  templateUrl: './public-profile.component.html',
  styleUrls: ['./public-profile.component.css']
})
export class PublicProfileComponent implements OnInit, OnDestroy {
  user!: User;
  username!: string;
  doesUserNotExists = false;
  routerSubscription!: Subscription;

  constructor(private userService: UserService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit(): void {
    this.routerSubscription = this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.setUserFromRoute();
      }
    });
    this.setUserFromRoute();
  }

  ngOnDestroy(): void {
    this.routerSubscription.unsubscribe();
  }

  setUserFromRoute(): void {
    this.setUsernameFromRoute();
    this.setUserFromUsername();
  }

  setUsernameFromRoute(): void {
    const usernameParamStr = 'username';
    const username = this.route.snapshot.paramMap.get(usernameParamStr);
    if (username) {
      this.username = username;
    }
  }

  setUserFromUsername(): void {
    this.userService.getByUsername(this.username)
      .subscribe(user => this.user = user,
        error => this.doesUserNotExists = error.status === 404);
  }
}
