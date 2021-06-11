import {Component, Input, OnInit} from '@angular/core';
import {User} from '../../../entity/user';

@Component({
  selector: 'app-auth-header',
  templateUrl: './auth-header.component.html',
  styleUrls: ['./auth-header.component.css']
})
export class AuthHeaderComponent implements OnInit {
  @Input()
  currentUser: Partial<User> | undefined;

  constructor() { }

  ngOnInit(): void {
  }

}
