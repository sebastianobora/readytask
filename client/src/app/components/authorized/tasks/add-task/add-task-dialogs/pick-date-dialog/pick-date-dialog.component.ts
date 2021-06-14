import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-pick-date-dialog',
  templateUrl: './pick-date-dialog.component.html',
  styleUrls: ['./pick-date-dialog.component.css']
})
export class PickDateDialogComponent implements OnInit {
  pickedDate: Date | undefined;

  constructor() {
  }

  ngOnInit(): void {
  }

}
