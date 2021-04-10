import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-non-auth-content',
  templateUrl: './non-auth-content.component.html',
  styleUrls: ['./non-auth-content.component.css']
})
export class NonAuthContentComponent implements OnInit {

  @Input() sectionId: string | undefined;

  constructor() { }

  ngOnInit(): void {
  }
}
