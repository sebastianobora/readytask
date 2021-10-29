import {Component, Input, OnInit} from '@angular/core';
import {User} from '../../../entity/user';
import {AuthService} from '../../../security/auth.service';

@Component({
  selector: 'app-auth-header',
  templateUrl: './auth-header.component.html',
  styleUrls: ['./auth-header.component.css']
})
export class AuthHeaderComponent implements OnInit {
  @Input()
  currentUser?: User;

  constructor(public authService: AuthService) {
  }

  ngOnInit(): void {
  }
}

