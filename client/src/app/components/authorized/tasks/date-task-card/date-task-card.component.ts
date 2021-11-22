import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-date-task-card[deadline][tooltipMessage]',
  templateUrl: './date-task-card.html',
  styleUrls: ['./date-task-card.css']
})
export class DateTaskCard implements OnInit {
  @Input() deadline!: Date;
  @Input() tooltipMessage!: string;

  constructor() {
  }

  ngOnInit(): void {
  }

}
