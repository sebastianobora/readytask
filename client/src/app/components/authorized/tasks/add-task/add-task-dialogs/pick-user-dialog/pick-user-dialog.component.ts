import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {User} from '../../../../../../entity/user';

@Component({
  selector: 'app-pick-user-dialog',
  templateUrl: './pick-user-dialog.component.html',
  styleUrls: ['./pick-user-dialog.component.css']
})
export class PickUserDialogComponent implements OnInit {
  pickedUser: User | undefined;

  constructor(@Inject(MAT_DIALOG_DATA) public users: User[]) {
  }

  ngOnInit(): void {
  }

}
