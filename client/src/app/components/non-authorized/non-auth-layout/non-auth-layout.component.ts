import {Component, Inject, OnDestroy, OnInit, Renderer2} from '@angular/core';
import { DOCUMENT } from '@angular/common';

declare var particlesJS: any;

@Component({
  selector: 'app-non-auth-layout',
  templateUrl: './non-auth-layout.component.html',
  styleUrls: ['./non-auth-layout.component.css']
})
export class NonAuthLayoutComponent implements OnInit, OnDestroy {
  constructor(
    @Inject(DOCUMENT) private document: Document,
    private renderer: Renderer2
  ) {}

  ngOnInit(): void {
    this.renderer.addClass(this.document.getElementsByTagName('header')[0], 'non-auth-layout-header');
    this.renderer.addClass(this.document.body, 'non-auth-layout-background');
    this.renderer.addClass(this.document.getElementsByTagName('footer')[0], 'non-auth-layout-footer');
    particlesJS.load('particles-js', 'assets/particlesjs-config.json', null);
  }

  ngOnDestroy(): void {
    this.renderer.removeClass(this.document.body, 'non-auth-layout-background');
  }
}
