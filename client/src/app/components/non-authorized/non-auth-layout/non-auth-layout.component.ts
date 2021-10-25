import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FooterComponent} from '../../common/footer/footer.component';
import {LayoutService} from '../../../service/layout.service';

declare var particlesJS: any;

@Component({
  selector: 'app-non-auth-layout',
  templateUrl: './non-auth-layout.component.html',
  styleUrls: ['./non-auth-layout.component.css']
})
export class NonAuthLayoutComponent implements OnInit, OnDestroy,  AfterViewInit{
  @ViewChild(FooterComponent, {read: ElementRef}) footerEl!: ElementRef;
  nonAuthLayoutFooterClass = 'non-auth-layout-footer';

  constructor(private layoutService: LayoutService) {
  }

  ngAfterViewInit(): void {
    this.layoutService.addFooterClass(this.footerEl, this.nonAuthLayoutFooterClass);
  }

  ngOnInit(): void {
    this.loadParticleJS();
  }

  ngOnDestroy(): void {
    this.layoutService.removeFooterClass(this.footerEl, this.nonAuthLayoutFooterClass);
  }

  loadParticleJS(): void{
    particlesJS.load('particles-js', 'assets/particlesjs-config.json', null);
  }
}
