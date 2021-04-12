import {AfterViewInit, Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

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
      console.log(f);
      const element = document.querySelector('#' + f);
      console.log(element);
      if (element) {
        element.scrollIntoView();
      }
    });
  }

}
