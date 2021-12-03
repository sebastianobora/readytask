import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-date-task-card[date][tooltipMessage]',
  templateUrl: './date-task-card.html',
  styleUrls: ['./date-task-card.css']
})
export class DateTaskCardComponent implements OnInit {
  @Input() type: 'date' | 'deadline' = 'date';
  @Input() date!: Date;
  @Input() tooltipMessage!: string;
  currentDateString?: String;
  deadlineDateString?: String;

  constructor() {
  }

  ngOnInit(): void {
    if (this.type === 'deadline') {
      this.currentDateString = new Date().toLocaleDateString();
      this.deadlineDateString = new Date(this.date).toLocaleDateString();
    }
  }

}
