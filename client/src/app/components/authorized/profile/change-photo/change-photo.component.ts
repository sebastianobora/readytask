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
  user!: User;
  currentDisplayedPhoto?: string;
  invalidPhotoMessages: string[] = [];
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
    this.uploadedPhoto = event.target.files[0];
    if (this.uploadedPhoto) {
      const photoUrl = URL.createObjectURL(this.uploadedPhoto);
      this.currentDisplayedPhoto = this.getTrustedUrl(photoUrl);
    }
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
    const isTypeValid = this.isPhotoTypeValid(photo.type);
    const isSizeValid = this.isPhotoSizeValid(photo.size);

    if (!isTypeValid) {
      this.notifierService.notify('Uploaded photo has invalid type!', 'error');
      return false;
    }

    if (!isSizeValid) {
      this.notifierService.notify('Uploaded photo has invalid size!', 'error');
      return false;
    }
    return true;
  }

  isPhotoTypeValid(type: string): boolean {
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    return allowedTypes.includes(type);
  }

  isPhotoSizeValid(size: number): boolean {
    const sizeLimitInKb = 5 * 1024 * 1024;
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
