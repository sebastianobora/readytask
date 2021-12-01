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
  @Input() shadow: 'dark' | 'light' = 'dark';
  @Input() size!: 'xxs' | 'xs' | 's' | 'm' | 'l' | 'xl' | number;
  placeholderClasses!: string[];
  customSizes = {};
  private customSizeErrorMessage = 'Value of passed \"size\" parameter is invalid.\nSize must to be greater than 0.';

  constructor() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    const size = changes.size?.currentValue;
    if (size && this.isTypeOfNumber(size)) {
      this.validateCustomSize();
      this.customSizes = this.buildCustomStyles();
    } else {
      this.customSizes = {};
    }
  }

  ngOnInit(): void {
    this.placeholderClasses = this.getProperties();
  }

  isTypeOfNumber(value: any): boolean {
    return typeof value === 'number';
  }

  private validateCustomSize(): void {
    if (this.size <= 0) {
      throw new Error(this.customSizeErrorMessage);
    }
  }

  private getProperties(): string[] {
    const properties = [this.shape.toString(), this.color.toString(), this.shadow.toString()];
    if (!this.isTypeOfNumber(this.size)) {
      properties.push(this.size.toString());
    }
    return properties;
  }

  private buildCustomStyles(): object {
    return {
      'font-size': Number(this.size) / 2 + 'px',
      'height': this.size + 'px',
      'width': this.size + 'px'
    };
  }
}
