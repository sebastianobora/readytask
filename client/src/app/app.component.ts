import {Component} from '@angular/core';
import {AuthLayoutComponent} from './components/authorized/auth-layout/auth-layout.component';
import {NonAuthLayoutComponent} from './components/non-authorized/non-auth-layout/non-auth-layout.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'readytask';
  authLayoutClassname = 'auth-layout-background';
  nonAuthLayoutClassname = 'non-auth-layout-background';
  isAuthorizedLayout!: boolean;

  changeLayout(componentReference: AuthLayoutComponent | NonAuthLayoutComponent): void {
    this.isAuthorizedLayout = componentReference instanceof AuthLayoutComponent;
  }
}
