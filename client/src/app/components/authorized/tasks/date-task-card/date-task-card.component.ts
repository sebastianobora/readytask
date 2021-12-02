import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-date-task-card[date][tooltipMessage]',
  templateUrl: './date-task-card.html',
  styleUrls: ['./date-task-card.css']
})
export class DateTaskCardComponent implements OnInit {
  @Input() date!: Date;
  @Input() tooltipMessage!: string;

  constructor() {
  }

  ngOnInit(): void {
  }

}
