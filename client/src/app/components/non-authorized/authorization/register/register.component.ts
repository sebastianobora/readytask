import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from '../../../../security/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['../authorization.components.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  errorMessage = '';

  constructor(private router: Router,
              private formBuilder: FormBuilder,
              private authService: AuthService) {
    this.registerForm = this.initializeRegisterForm();
  }

  ngOnInit(): void {
  }

  initializeRegisterForm(): FormGroup{
    return this.formBuilder.group({
      username: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]),
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
          setTimeout(() => { this.errorMessage = ''; }, 2500);
        }
      );
  }
}
