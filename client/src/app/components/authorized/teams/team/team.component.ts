import {Component, OnInit} from '@angular/core';
import {Location} from '@angular/common';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit {
  teamId!: string;

  constructor(
    private location: Location,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    const teamId = this.route.snapshot.paramMap.get('id');
    if (teamId){
      this.teamId = teamId;
    }
  }

  goBack(): void {
    this.location.back();
  }
}
