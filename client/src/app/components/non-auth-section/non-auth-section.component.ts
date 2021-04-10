import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-non-auth-section',
  templateUrl: './non-auth-section.component.html',
  styleUrls: ['./non-auth-section.component.css']
})
export class NonAuthSectionComponent implements OnInit {

  @Input() sectionId: string | undefined;

  constructor() { }

  ngOnInit(): void {
  }
}
