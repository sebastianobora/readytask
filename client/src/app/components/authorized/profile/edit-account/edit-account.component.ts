import {Component, OnInit} from '@angular/core';
import {UserService} from '../../../../service/user.service';
import {AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators} from '@angular/forms';
import {User} from '../../../../entity/user';
import CustomValidators from '../../../../validators/CustomValidators';
import {NotifierService} from '../../../../service/notifier.service';

@Component({
  selector: 'app-edit-account',
  templateUrl: './edit-account.component.html',
  styleUrls: ['./edit-account.component.css', '../profile.css']
})
export class EditAccountComponent implements OnInit {
  user!: User;
  changePasswordForm: FormGroup;
  successfulMessage = 'Your password has been changed!';

  constructor(private userService: UserService,
              private formBuilder: FormBuilder,
              private notifierService: NotifierService) {
    this.changePasswordForm = this.getChangePasswordForm();
  }

  get currentPassword(): AbstractControl {
    const currentPasswordControlName = 'currentPassword';
    return this.changePasswordForm.controls[currentPasswordControlName];
  }

  get newPassword(): AbstractControl {
    const newPasswordControlName = 'newPassword';
    return this.changePasswordForm.controls[newPasswordControlName];
  }

  get confirmNewPassword(): AbstractControl {
    const confirmNewPasswordControlName = 'confirmNewPassword';
    return this.changePasswordForm.controls[confirmNewPasswordControlName];
  }

  ngOnInit(): void {
    this.userService.getCurrentLogged().subscribe(user => this.user = user);
  }

  getChangePasswordForm(): FormGroup {
    return this.formBuilder.group({
      currentPassword: new FormControl('', Validators.required),
      newPassword: new FormControl('',
        [Validators.required,
          CustomValidators.Password(),
          Validators.maxLength(30),
          Validators.minLength(6)]
      ),
      confirmNewPassword: new FormControl('', Validators.required)
    }, {
      validators: [
        CustomValidators.ValuesMatch('newPassword', 'confirmNewPassword')
      ]
    });
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
    return CustomValidators.getPasswordErrorMessage(error);
  }

  resetChangePasswordForm(): void {
    this.changePasswordForm.reset();
    Object.keys(this.changePasswordForm.controls).forEach(key => {
      this.changePasswordForm.controls[key].setErrors(null);
    });
  }
}
