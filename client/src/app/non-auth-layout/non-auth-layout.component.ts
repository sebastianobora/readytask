import {Component, Inject, OnDestroy, OnInit, Renderer2} from '@angular/core';
import { DOCUMENT } from '@angular/common';

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
    this.renderer.addClass(this.document.body, 'non-auth-layout-background');
  }

  ngOnDestroy(): void {
    this.renderer.removeClass(this.document.body, 'non-auth-layout-background');
  }
}
