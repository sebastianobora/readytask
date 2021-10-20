import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../../../service/user.service';
import {User} from '../../../../entity/user';
import {NotifierService} from '../../../../service/notifier.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-manage-profile',
  templateUrl: './manage-profile.component.html',
  styleUrls: ['./manage-profile.component.css', '../profile.css']
})
export class ManageProfileComponent implements OnInit {
  successfulUpdateMessage = 'Your profile has been updated successfully!';
  user?: User;
  manageProfileForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.max(50)]),
    surname: new FormControl('', [Validators.required, Validators.max(50)]),
    description: new FormControl('', [Validators.max(255)])
  });

  constructor(private userService: UserService,
              private notifierService: NotifierService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.loadCurrentLoggedUser();
  }

  loadCurrentLoggedUser(): void {
    this.userService.getCurrentLogged().subscribe(
      user => {
        this.user = user;
        this.setFormValues(user);
      }
    );
  }

  setFormValues(user: User): void {
    this.manageProfileForm.get('name')?.setValue(user.firstName);
    this.manageProfileForm.get('surname')?.setValue(user.lastName);
    this.manageProfileForm.get('description')?.setValue(user?.description);
  }

  confirmAndUpdateChanges(): void {
    const user = this.getUpdatedUser();
    this.userService.updateProfile(user)
      .subscribe(() => {
        this.notifierService.notify(this.successfulUpdateMessage, 'success');
        this.router.navigate(['profile/public/' + this.user?.username]);
      });
  }

  getUpdatedUser(): Partial<User> {
    return {
      id: this.user?.id,
      firstName: this.manageProfileForm.value.name,
      lastName: this.manageProfileForm.value.surname,
      description: this.manageProfileForm.value.description
    };
  }
}
