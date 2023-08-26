import {Component} from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from '../../../../security/auth.service';
import PasswordValidator from '../../../../validators/PasswordValidator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['../authorization.components.css']
})
export class RegisterComponent {
  registerForm: FormGroup;
  errorMessage = '';

  constructor(private router: Router,
              private formBuilder: FormBuilder,
              private authService: AuthService) {
    this.registerForm = this.initializeRegisterForm();
  }

  get password(): AbstractControl {
    const passwordControlName = 'password';
    return this.registerForm.controls[passwordControlName];
  }

  getPasswordErrorMessage(error: ValidationErrors): string | null {
    return PasswordValidator.getErrorMessage(error);
  }

  initializeRegisterForm(): FormGroup {
    return this.formBuilder.group({
      username: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password : new FormControl('', [
        Validators.required,
        Validators.minLength(12),
        PasswordValidator.validator()
      ]),
      firstName: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(30)]),
      lastName: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(30)])
    });
  }

  register(): void {
    const f = this.registerForm.controls;
    this.authService
      .register(f.email.value, f.username.value, f.password.value, f.firstName.value, f.lastName.value)
      .subscribe(
        () => {
          this.authService.login(f.username.value, f.password.value).subscribe(
            () => {
              this.router.navigate(['teams/my-teams']);
            }
          );
        }, () => {
          this.errorMessage = 'User already exists!';
          setTimeout(() => {
            this.errorMessage = '';
          }, 2500);
        }
      );
  }

  protected readonly PasswordValidator = PasswordValidator;
}
