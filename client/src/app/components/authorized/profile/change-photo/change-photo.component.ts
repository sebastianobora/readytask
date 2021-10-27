import { Component, OnInit } from '@angular/core';
import {User} from '../../../../entity/user';
import {UserService} from '../../../../service/user.service';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-change-photo',
  templateUrl: './change-photo.component.html',
  styleUrls: ['./change-photo.component.css', '../profile.css']
})
export class ChangePhotoComponent implements OnInit {
  changePhotoDisabledHint = 'First browse files and pick photo!';
  user!: User;
  currentDisplayedPhoto?: string;
  uploadedPhoto?: File;
  constructor(private userService: UserService,
              private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.setCurrentLoggedUser();
  }

  setCurrentLoggedUser(): void{
    this.userService.getCurrentLogged().subscribe(user => {
      this.user = user;
      this.currentDisplayedPhoto = user?.img;
    });
  }

  setPhoto(event: any): void {
    this.uploadedPhoto = event.target.files[0];
    const photoUrl = URL.createObjectURL(this.uploadedPhoto);
    this.currentDisplayedPhoto = this.getTrustedUrl(photoUrl);
  }

  getTrustedUrl(url: string): string{
    return this.sanitizer.bypassSecurityTrustUrl(url) as string;
  }

  changePhoto(): void {
    console.log('photo has been changed');
  }

  freeMemory(): void {
    if (this.currentDisplayedPhoto) {
      URL.revokeObjectURL(this.currentDisplayedPhoto);
    }
  }
}
