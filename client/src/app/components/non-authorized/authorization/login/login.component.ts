import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../../../security/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../authorization.components.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  errorMessage = '';

  constructor(private router: Router,
              private formBuilder: FormBuilder,
              private authService: AuthService) {
    this.loginForm = this.initLoginForm();
  }

  ngOnInit(): void {
  }

  initLoginForm(): FormGroup {
    return this.formBuilder.group({
      username: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(20)]),
      password: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(30)])
    });
  }

  login(): void {
    const f = this.loginForm.controls;
    this.authService.login(f.username.value, f.password.value)
      .subscribe(() => {
        this.router.navigate(['teams/my-teams']);
      }, () => {
          this.errorMessage = 'Incorrect credentials!';
          setTimeout(() => { this.errorMessage = ''; }, 2500);
      });
  }
}
