import {Injectable} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {NotificationComponent} from '../components/common/notification/notification.component';

@Injectable({
  providedIn: 'root'
})
export class NotifierService {

  constructor(private snackBar: MatSnackBar) {
  }

  notify(message: string, type: 'error' | 'success'): void {
    const className = `notify-${type}`;
    this.snackBar.openFromComponent(NotificationComponent, {
      data: {
        message,
        type
      },
      duration: 3000,
      panelClass: ['auth-notifier-cfg', className],
      verticalPosition: 'top',
      horizontalPosition: 'center'
    });
  }
}
