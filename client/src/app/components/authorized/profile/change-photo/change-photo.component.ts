import {Component, OnDestroy, OnInit} from '@angular/core';
import {User} from '../../../../entity/user';
import {UserService} from '../../../../service/user.service';
import {DomSanitizer} from '@angular/platform-browser';
import {NotifierService} from '../../../../service/notifier.service';
import {Observable, Subscription} from 'rxjs';
import {AngularFireStorage} from '@angular/fire/compat/storage';
import {finalize} from 'rxjs/operators';
import {LoggedUserService} from '../../../../service/logged-user.service';
import {FormControl} from '@angular/forms';
import {ConfirmationService} from '../../../../service/confirmation.service';

@Component({
  selector: 'app-change-photo',
  templateUrl: './change-photo.component.html',
  styleUrls: ['./change-photo.component.css', '../profile.css']
})
export class ChangePhotoComponent implements OnInit, OnDestroy {
  imageChangedMessage = 'Your photo has been changed';
  imageDeletedMessage = 'Your photo has been deleted';
  changeImageDisabledHint = 'First browse files and pick photo!';
  invalidTypeError = 'Selected photo has invalid type!';
  invalidSizeError = 'Selected photo has invalid size!';
  maxImageSizeInMb = 5;
  invalidImageError?: string;
  currentDisplayedImage?: string;
  user!: User;
  uploadedImage = new FormControl();
  uploadPercent!: Observable<number | undefined>;
  loggedUserSubscription!: Subscription;

  constructor(private userService: UserService,
              private notifierService: NotifierService,
              private loggedUserService: LoggedUserService,
              private confirmationService: ConfirmationService,
              private storage: AngularFireStorage,
              private sanitizer: DomSanitizer) {
  }

  ngOnInit(): void {
    this.setLoggedUser();
  }

  ngOnDestroy(): void {
    this.loggedUserSubscription.unsubscribe();
  }

  setLoggedUser(): void {
    this.loggedUserSubscription = this.loggedUserService.loggedUser.subscribe(
      user => {
        this.user = user;
        this.currentDisplayedImage = user.img;
      });
  }

  setImage(event: any): void {
    this.resetErrorsAndCurrentDisplayedPhoto();
    this.uploadedImage.setValue(event.target.files[0]);
    if (this.uploadedImage && this.isImageValid(this.uploadedImage.value)) {
      const imageUrl = URL.createObjectURL(this.uploadedImage.value);
      this.currentDisplayedImage = this.getTrustedUrl(imageUrl);
    }
  }

  resetErrorsAndCurrentDisplayedPhoto(): void {
    this.invalidImageError = '';
    this.currentDisplayedImage = '';
  }

  isImageValid(image: File): boolean {
    const isSizeValid = this.isImageSizeValid(image.size);
    const isTypeValid = this.isImageTypeValid(image.type);

    if (!isSizeValid) {
      this.invalidImageError = this.invalidSizeError;
    }
    if (!isTypeValid) {
      this.invalidImageError = this.invalidTypeError;
    }
    return isTypeValid && isSizeValid;
  }

  isImageTypeValid(type: string): boolean {
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    return allowedTypes.includes(type);
  }

  isImageSizeValid(size: number): boolean {
    const sizeLimitInKb = this.maxImageSizeInMb * 1024 * 1024;
    return size <= sizeLimitInKb;
  }

  getTrustedUrl(url: string): string {
    return this.sanitizer.bypassSecurityTrustUrl(url) as string;
  }

  validAndSaveImage(): void {
    if (this.uploadedImage.value && this.isImageValid(this.uploadedImage.value)) {
      this.saveImage(this.uploadedImage.value);
    }
  }

  saveImage(image: File): void {
    const filePath = this.getImagePath();
    const fileUrl = this.storage.ref(filePath).getDownloadURL();
    const uploadTask = this.storage.upload(filePath, image);
    this.uploadPercent = uploadTask.percentageChanges();
    uploadTask.snapshotChanges().pipe(
      finalize(() => fileUrl.subscribe(url => this.updateUserImage(url)))
    ).subscribe();
  }

  getImagePath(): string {
    const baseUrl = `profile-photos/photo-`;
    return baseUrl + this.user.username;
  }

  updateUserImage(imageUrl: string): void {
    const user = {id: this.user.id, img: imageUrl};
    this.userService
      .updateImage(user)
      .subscribe(() => this.notifyAndResetForm(this.imageChangedMessage));
  }

  notifyAndResetForm(notifyMessage: string): void {
    this.loggedUserService.loadLoggedUser();
    this.notifierService.notify(notifyMessage, 'success');
    this.uploadedImage.reset();
    this.uploadPercent = new Observable(undefined);
  }

  confirmAndDeleteImage(): void {
    this.confirmationService.isConfirmed(() => this.deleteImage());
  }

  deleteImage(): void {
    this.userService.updateImage({id: this.user.id, img: ''}).subscribe(
      () => {
        this.storage.refFromURL(this.user.img).delete();
        this.notifyAndResetForm(this.imageDeletedMessage);
      }
    );
  }

  freeMemory(): void {
    if (this.currentDisplayedImage) {
      URL.revokeObjectURL(this.currentDisplayedImage);
    }
  }
}
