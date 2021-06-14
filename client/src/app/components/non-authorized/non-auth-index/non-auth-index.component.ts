import {AfterViewInit, Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-non-auth-index',
  templateUrl: './non-auth-index.component.html',
  styleUrls: ['./non-auth-index.component.css']
})
export class NonAuthIndexComponent implements OnInit, AfterViewInit {
  mainSections: {
    whyReadyTask: string,
    tutorial: string,
    about: string,
    contact: string
  } = {
    whyReadyTask: 'why-readytask',
    tutorial: 'tutorial',
    about: 'about',
    contact: 'contact'
  };

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.route.fragment.subscribe(f => {
      const element = document.querySelector('#' + f);
      if (element) {
        const headerOffset = 60;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition - headerOffset;
        window.scrollTo({top: offsetPosition, behavior: 'auto'});
      }
    });
  }
}
