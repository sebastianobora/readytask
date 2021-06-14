import {Component, Input, OnInit} from '@angular/core';
import {User} from '../../../entity/user';
import {AuthService} from '../../../security/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-auth-header',
  templateUrl: './auth-header.component.html',
  styleUrls: ['./auth-header.component.css']
})
export class AuthHeaderComponent implements OnInit {
  @Input()
  currentUser: Partial<User> | undefined;

  constructor(private authService: AuthService,
              private router: Router) {
  }

  ngOnInit(): void {
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['']);
  }
}

