import {Component, OnInit} from '@angular/core';
import {UserService} from '../../../../service/user.service';
import {ConfirmationService} from '../../../../service/confirmation.service';
import {AuthService} from '../../../../security/auth.service';
import {NotifierService} from '../../../../service/notifier.service';
import {FormBuilder, FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-close-account',
  templateUrl: './close-account.component.html',
  styleUrls: ['./close-account.component.css', '../profile.css']
})
export class CloseAccountComponent implements OnInit {
  closeAccountFormControl: FormControl;
  successfulMessage = 'Your account has been closed.';
  errorMessage = 'Wrong password!';
  requiredMessage = 'Field is required!';

  constructor(private userService: UserService,
              private confirmationService: ConfirmationService,
              private notifierService: NotifierService,
              private authService: AuthService,
              private formBuilder: FormBuilder) {
    this.closeAccountFormControl = this.getCloseAccountForm();
  }

  ngOnInit(): void {
  }

  getCloseAccountForm(): FormControl {
    return this.formBuilder.control('', [Validators.required]);
  }

  confirmAndCloseAccount(): void {
    this.confirmationService.isConfirmed(() => this.closeAccount());
  }

  closeAccount(): void {
    const password = this.closeAccountFormControl.value;
    this.userService.deleteCurrentLogged(password).subscribe(
      () => this.logoutAndNotify(),
      () => {
        this.closeAccountFormControl.setErrors({invalidPassword: true});
      }
    );
  }

  logoutAndNotify(): void {
    this.authService.logout();
    this.notifierService.notify(this.successfulMessage, 'success');
  }
}
