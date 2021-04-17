import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NonAuthHeaderComponent } from './components/non-auth-header/non-auth-header.component';
import { FooterComponent } from './components/footer/footer.component';
import { NonAuthLayoutComponent } from './components/non-auth-layout/non-auth-layout.component';
import { WhyReadytaskComponent } from './components/why-readytask/why-readytask.component';
import { NonAuthSectionComponent } from './components/non-auth-section/non-auth-section.component';
import { NonAuthMainComponent } from './components/non-auth-main/non-auth-main.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { TutorialComponent } from './components/tutorial/tutorial.component';
import { AboutComponent } from './components/about/about.component';
import { ContactComponent } from './components/contact/contact.component';

@NgModule({
  declarations: [
    AppComponent,
    NonAuthHeaderComponent,
    FooterComponent,
    NonAuthLayoutComponent,
    WhyReadytaskComponent,
    NonAuthSectionComponent,
    NonAuthMainComponent,
    LoginComponent,
    RegisterComponent,
    TutorialComponent,
    AboutComponent,
    ContactComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
