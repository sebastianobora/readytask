import {Component, Inject, OnDestroy, OnInit, Renderer2} from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-auth-layout',
  templateUrl: './auth-layout.component.html',
  styleUrls: ['./auth-layout.component.css']
})
export class AuthLayoutComponent implements OnInit, OnDestroy {

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private renderer: Renderer2
  ) {}

  ngOnInit(): void {
    this.renderer.addClass(this.document.getElementsByTagName('header')[0], 'auth-layout-header');
    this.renderer.addClass(this.document.body, 'auth-layout-background');
    this.renderer.addClass(this.document.getElementsByTagName('footer')[0], 'auth-layout-footer');
  }

  ngOnDestroy(): void {
    this.renderer.addClass(this.document.getElementsByTagName('header')[0], 'auth-layout-header');
    this.renderer.removeClass(this.document.body, 'auth-layout-background');
    this.renderer.removeClass(this.document.getElementsByTagName('footer')[0], 'auth-layout-footer');
  }
}
