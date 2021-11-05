import {Injectable} from '@angular/core';
import {ReplaySubject} from 'rxjs';
import {UserService} from './user.service';
import {User} from '../entity/user';

@Injectable()
export class LoggedUserService {
  private loggedUserDataSource = new ReplaySubject<User>(1);
  public loggedUser = this.loggedUserDataSource.asObservable();

  constructor(private userService: UserService) {
    this.loadLoggedUser();
  }

  loadLoggedUser(): void {
    this.userService.getCurrentLogged().subscribe(user => this.loggedUserDataSource.next(user));
  }
}
