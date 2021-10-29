import {Component, OnInit} from '@angular/core';
import {User} from '../../../../entity/user';
import {UserService} from '../../../../service/user.service';
import {DomSanitizer} from '@angular/platform-browser';
import {NotifierService} from '../../../../service/notifier.service';

@Component({
  selector: 'app-change-photo',
  templateUrl: './change-photo.component.html',
  styleUrls: ['./change-photo.component.css', '../profile.css']
})
export class ChangePhotoComponent implements OnInit {
  changePhotoDisabledHint = 'First browse files and pick photo!';
  invalidTypeError = 'Selected photo has invalid type!';
  invalidSizeError = 'Selected photo has invalid size!';
  maxPhotoSizeInMb = 5;
  invalidPhotoError?: string;
  currentDisplayedPhoto?: string;
  user!: User;
  uploadedPhoto?: File;

  constructor(private userService: UserService,
              private notifierService: NotifierService,
              private sanitizer: DomSanitizer) {
  }

  ngOnInit(): void {
    this.setCurrentLoggedUser();
  }

  setCurrentLoggedUser(): void {
    this.userService.getCurrentLogged().subscribe(user => {
      this.user = user;
      this.currentDisplayedPhoto = user?.img;
    });
  }

  setPhoto(event: any): void {
    this.resetErrorsAndCurrentDisplayedPhoto();
    this.uploadedPhoto = event.target.files[0];
    if (this.uploadedPhoto && this.isPhotoValid(this.uploadedPhoto)) {
      const photoUrl = URL.createObjectURL(this.uploadedPhoto);
      this.currentDisplayedPhoto = this.getTrustedUrl(photoUrl);
    }
  }

  resetErrorsAndCurrentDisplayedPhoto(): void {
    this.invalidPhotoError = '';
    this.currentDisplayedPhoto = '';
  }

  validAndChangePhoto(): void {
    if (this.uploadedPhoto && this.isPhotoValid(this.uploadedPhoto)) {
      this.changePhoto();
    }
  }

  changePhoto(): void {
    this.notifierService.notify('Photo has been changed!', 'success');
  }

  isPhotoValid(photo: File): boolean {
    const isSizeValid = this.isPhotoSizeValid(photo.size);
    const isTypeValid = this.isPhotoTypeValid(photo.type);
    
    if (!isSizeValid) {
      this.invalidPhotoError = this.invalidSizeError;
    }
    if (!isTypeValid) {
      this.invalidPhotoError = this.invalidTypeError;
    }
    return isTypeValid && isSizeValid;
  }

  isPhotoTypeValid(type: string): boolean {
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    return allowedTypes.includes(type);
  }

  isPhotoSizeValid(size: number): boolean {
    const sizeLimitInKb = this.maxPhotoSizeInMb * 1024 * 1024;
    return size <= sizeLimitInKb;
  }

  getTrustedUrl(url: string): string {
    return this.sanitizer.bypassSecurityTrustUrl(url) as string;
  }

  freeMemory(): void {
    if (this.currentDisplayedPhoto) {
      URL.revokeObjectURL(this.currentDisplayedPhoto);
    }
  }
}
