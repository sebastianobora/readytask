import {Directive, ElementRef, Input, NgZone, OnChanges, SimpleChanges} from '@angular/core';

@Directive({
  selector: '[appFocusOnChange]'
})
export class FocusOnChangeDirective implements OnChanges {
  @Input() disabledOrHidden!: boolean;

  constructor(private element: ElementRef,
              private ngZone: NgZone) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!this.disabledOrHidden) {
      this.setFocus();
    }
  }

  setFocus(): void {
    this.ngZone.runOutsideAngular(() =>
      setTimeout(() =>
        this.element.nativeElement.focus(), 0));
  }
}
