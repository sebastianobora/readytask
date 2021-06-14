import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {Team} from '../../../../../../entity/team';

@Component({
  selector: 'app-pick-team-dialog',
  templateUrl: './pick-team-dialog.component.html',
  styleUrls: ['./pick-team-dialog.component.css']
})
export class PickTeamDialogComponent implements OnInit {
  pickedTeam: Team | undefined;

  constructor(@Inject(MAT_DIALOG_DATA) public teams: Team[]) {
  }

  ngOnInit(): void {
  }
}
