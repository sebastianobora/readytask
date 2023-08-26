import {Component, OnInit} from '@angular/core';
import {UserService} from '../../../../service/user.service';
import {AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators} from '@angular/forms';
import {User} from '../../../../entity/user';
import PasswordValidator from '../../../../validators/PasswordValidator';
import {NotifierService} from '../../../../service/notifier.service';
import {LoggedUserService} from '../../../../service/logged-user.service';
import MatchValidator from '../../../../validators/MatchValidator';

@Component({
  selector: 'app-edit-account',
  templateUrl: './edit-account.component.html',
  styleUrls: ['./edit-account.component.css', '../profile.css']
})
export class EditAccountComponent implements OnInit {
  user!: User;
  changePasswordForm: FormGroup;
  successfulMessage = 'Your password has been changed!';

  private currentPasswordControlName: string = 'currentPassword';
  private newPasswordControlName: string = 'newPassword';
  private confirmPasswordControlName: string = 'confirmNewPassword';

  constructor(private userService: UserService,
              private loggedUserService: LoggedUserService,
              private notifierService: NotifierService,
              private formBuilder: FormBuilder) {
    this.changePasswordForm = this.getChangePasswordForm();
  }

  get currentPassword(): AbstractControl {
    return this.changePasswordForm.controls[this.currentPasswordControlName];
  }

  get newPassword(): AbstractControl {
    return this.changePasswordForm.controls[this.newPasswordControlName];
  }

  get confirmNewPassword(): AbstractControl {
    return this.changePasswordForm.controls[this.confirmPasswordControlName];
  }

  ngOnInit(): void {
    this.getLoggedUser();
  }

  getLoggedUser(): void {
    this.loggedUserService.loggedUser.subscribe(user => this.user = user);
  }

  private getChangePasswordForm(): FormGroup {
    return this.formBuilder.group({
        [this.currentPasswordControlName]: new FormControl('', Validators.required),
        [this.newPasswordControlName]: new FormControl('', this.getPasswordValidators()),
        [this.confirmPasswordControlName]: new FormControl('', Validators.required)
      },
      {
        validators: [
          MatchValidator.valuesMatch(this.newPasswordControlName, this.confirmPasswordControlName)
        ]
      });
  }

  private getPasswordValidators(): ValidatorFn[] {
    return [
      Validators.required,
      PasswordValidator.validator(),
      Validators.minLength(12)
    ];
  }

  changePassword(): void {
    const f = this.changePasswordForm.controls;
    this.userService.updatePassword(this.user.id, f.currentPassword.value, f.newPassword.value)
      .subscribe(
        () => {
          this.notifierService.notify(this.successfulMessage, 'success');
          this.resetChangePasswordForm();
        },
        () => {
          this.currentPassword.reset();
          this.currentPassword.setErrors({incorrectPassword: true});
        }
      );
  }

  getNewPasswordErrorMessage(error: ValidationErrors): string | null {
    return PasswordValidator.getErrorMessage(error);
  }

  resetChangePasswordForm(): void {
    this.changePasswordForm.reset();
    Object.keys(this.changePasswordForm.controls).forEach(key => {
      this.changePasswordForm.controls[key].setErrors(null);
    });
  }
}
