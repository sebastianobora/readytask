import { Injectable } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {Observable} from 'rxjs';
import {ConfirmationComponent} from '../components/common/confirmation/confirmation.component';

@Injectable({
  providedIn: 'root'
})
export class ConfirmationService {

  constructor(private dialog: MatDialog) { }

  isConfirmedWithSubscribe(): Observable<boolean> {
    return this.dialog.open(ConfirmationComponent).afterClosed(); // i w subscribe ciało
  }

  isConfirmed(callback: () => any): void{
    this.dialog
      .open(ConfirmationComponent, {autoFocus: true})
      .afterClosed()
      .subscribe(value => value ? callback() : this.dialog.closeAll());
  }
}
