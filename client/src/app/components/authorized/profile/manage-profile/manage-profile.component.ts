import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {UserService} from '../../../../service/user.service';
import {User} from '../../../../entity/user';

@Component({
  selector: 'app-manage-profile',
  templateUrl: './manage-profile.component.html',
  styleUrls: ['./manage-profile.component.css']
})
export class ManageProfileComponent implements OnInit {
  user?: User;
  manageProfileForm = new FormGroup({
    name: new FormControl(''),
    surname: new FormControl(''),
    description: new FormControl('')
  });

  constructor(private userService: UserService) {
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
    console.log(this.manageProfileForm.value);
  }
}
