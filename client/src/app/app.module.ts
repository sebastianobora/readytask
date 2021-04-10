import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NonAuthHeaderComponent } from './non-auth-header/non-auth-header.component';
import { NonAuthFooterComponent } from './non-auth-footer/non-auth-footer.component';
import { NonAuthLayoutComponent } from './non-auth-layout/non-auth-layout.component';
import { WhyReadytaskComponent } from './why-readytask/why-readytask.component';

@NgModule({
  declarations: [
    AppComponent,
    NonAuthHeaderComponent,
    NonAuthFooterComponent,
    NonAuthLayoutComponent,
    WhyReadytaskComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
