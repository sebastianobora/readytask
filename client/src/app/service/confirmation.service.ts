import {Injectable} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {ConfirmationComponent} from '../components/common/confirmation/confirmation.component';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConfirmationService {

  constructor(private dialog: MatDialog) {
  }

  isConfirmedWithSubscribe(): Observable<boolean> {
    return this.dialog.open(ConfirmationComponent).afterClosed();
  }

  confirm(callback: () => any, message = ''): void {
    this.dialog
      .open(ConfirmationComponent, {autoFocus: true, data: {message: message}})
      .afterClosed()
      .subscribe(value => value ? callback() : this.dialog.closeAll());
  }
}



