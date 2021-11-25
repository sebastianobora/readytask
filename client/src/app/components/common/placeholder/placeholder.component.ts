import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';

@Component({
  selector: 'app-placeholder[size]',
  templateUrl: './placeholder.component.html',
  styleUrls: ['./placeholder.component.css']
})
export class PlaceholderComponent implements OnInit, OnChanges {
  @Input() text?: string;
  @Input() shape: 'rounded' | 'square' = 'rounded';
  @Input() color: 'grey' | 'purple' = 'grey';
  @Input() size!: 'xxs' | 'xs' | 's' | 'm' | 'l' | 'xl' | number;
  @Input() shadow!: 'dark' | 'light';
  placeholderClasses!: string;
  customSizes = {};
  private customSizeErrorMessage = 'Value of passed \"size\" parameter is invalid.\nSize must to be greater than 0.';

  constructor() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    const size = changes['size'].currentValue;
    if (this.isTypeOfNumber(size)) {
      this.validateCustomSize();
      this.customSizes = this.buildCustomStyles();
    } else {
      this.customSizes = {};
    }
  }

  ngOnInit(): void {
    this.placeholderClasses = this.getPlaceholderClasses();
  }

  isTypeOfNumber(value: any) {
    return typeof value === 'number';
  }

  private validateCustomSize(): void {
    if (this.size <= 0) {
      throw new Error(this.customSizeErrorMessage);
    }
  }

  private getProperties(): string[] {
    const properties = [this.shape, this.color, this.shadow, this.size.toString()];
    if (this.isTypeOfNumber(this.size)) {
      properties.pop();
    }
    return properties;
  }

  private getPlaceholderClasses(): string {
    return this.getProperties().join(' ');
  }

  private buildCustomStyles() {
    return {'font-size': Number(this.size) / 2 + 'px', 'height': this.size + 'px', 'width': this.size + 'px'};
  }
}
