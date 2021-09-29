import {ElementRef, Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LayoutService {
  constructor() { }

  addFooterClass(element: ElementRef, className: string): void{
    element.nativeElement.querySelector('footer').classList.add(className);
  }

  removeFooterClass(element: ElementRef, className: string): void{
    element.nativeElement.querySelector('footer').classList.remove(className);
  }
}
