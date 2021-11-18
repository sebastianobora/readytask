import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-placeholder[size]',
  templateUrl: './placeholder.component.html',
  styleUrls: ['./placeholder.component.css']
})
export class PlaceholderComponent implements OnInit {
  @Input() text?: string;
  @Input() shape: 'rounded' | 'square' = 'rounded';
  @Input() color: 'grey' | 'purple' = 'grey';
  @Input() size!: 'xxs' | 'x-small' | 'small' | 'medium' | 'large' | 'x-large';
  @Input() shadow!: 'dark' | 'light';
  placeholderClasses!: string;

  constructor() {
  }

  ngOnInit(): void {
    this.placeholderClasses = this.getPlaceholderClasses();
  }

  getProperties(): string[] {
    return [this.shape, this.color, this.size, this.shadow];
  }

  getPlaceholderClasses(): string {
    return this.getProperties().join(' ');
  }
}
