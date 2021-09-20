import {ElementRef, EventEmitter, Injectable, Output} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LayoutService {
  @Output() changeLayout = new EventEmitter();
  constructor() { }

  addFooterClass(element: ElementRef, className: string): void{
    element.nativeElement.querySelector('footer').classList.add(className);
  }

  removeFooterClass(element: ElementRef, className: string): void{
    element.nativeElement.querySelector('footer').classList.remove(className);
  }
}
