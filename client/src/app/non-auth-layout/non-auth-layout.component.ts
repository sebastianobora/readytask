import {Component, OnDestroy, OnInit, Renderer2} from '@angular/core';

@Component({
  selector: 'app-non-auth-layout',
  templateUrl: './non-auth-layout.component.html',
  styleUrls: ['./non-auth-layout.component.css']
})
export class NonAuthLayoutComponent implements OnInit, OnDestroy {
  constructor(private renderer: Renderer2) {
    this.renderer.addClass(document.body, 'non-auth-layout-background');
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.renderer.removeClass(document.body, 'non-auth-layout-background');
  }

}
