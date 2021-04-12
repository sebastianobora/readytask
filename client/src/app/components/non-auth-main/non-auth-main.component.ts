import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-non-auth-main',
  templateUrl: './non-auth-main.component.html',
  styleUrls: ['./non-auth-main.component.css']
})
export class NonAuthMainComponent implements OnInit, AfterViewInit {

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.route.fragment.subscribe(f => {
      const element = document.querySelector('#' + f);
      if (element) {
        const headerOffset = 60;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition - headerOffset;
        window.scrollTo({ top: offsetPosition });
      }
    });
  }

}
