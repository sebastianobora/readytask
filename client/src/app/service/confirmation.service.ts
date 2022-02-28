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

  confirm(callback: () => any, message = ''): void {
    this.dialog
      .open(ConfirmationComponent, {autoFocus: true, data: {message}})
      .afterClosed()
      .subscribe(value => value ? callback() : this.dialog.closeAll());
  }

  isConfirmedWithSubscribe(): Observable<boolean> {
    return this.dialog.open(ConfirmationComponent).afterClosed();
  }
}





