import {Component, OnInit} from '@angular/core';
import {UserService} from '../../../../service/user.service';
import {ConfirmationService} from '../../../../service/confirmation.service';
import {AuthService} from '../../../../security/auth.service';
import {NotifierService} from '../../../../service/notifier.service';

@Component({
  selector: 'app-close-account',
  templateUrl: './close-account.component.html',
  styleUrls: ['./close-account.component.css', '../profile.css']
})
export class CloseAccountComponent implements OnInit {
  successfulMessage = 'Your account has been closed.';
  errorMessage = 'Wrong password!';

  constructor(private userService: UserService,
              private confirmationService: ConfirmationService,
              private notifierService: NotifierService,
              private authService: AuthService) {
  }

  ngOnInit(): void {
  }

  confirmAndCloseAccount(password: string): void {
    this.confirmationService.isConfirmed(() => this.closeAccount(password));
  }

  closeAccount(password: string): void {
    this.userService.deleteCurrentLogged(password).subscribe(
      () => this.logoutAndNotify(),
      () => this.notifierService.notify(this.errorMessage, 'error')
    );
  }

  logoutAndNotify(): void {
    this.authService.logout();
    this.notifierService.notify(this.successfulMessage, 'success');
  }
}
