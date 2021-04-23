import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NonAuthHeaderComponent } from './components/non-authorized/non-auth-header/non-auth-header.component';
import { FooterComponent } from './components/footer/footer.component';
import { NonAuthLayoutComponent } from './components/non-authorized/non-auth-layout/non-auth-layout.component';
import { WhyReadytaskComponent } from './components/non-authorized/why-readytask/why-readytask.component';
import { SectionComponent } from './components/section/section.component';
import { NonAuthIndexComponent } from './components/non-authorized/non-auth-index/non-auth-index.component';
import { LoginComponent } from './components/non-authorized/authorization/login/login.component';
import { RegisterComponent } from './components/non-authorized/authorization/register/register.component';
import { TutorialComponent } from './components/non-authorized/tutorial/tutorial.component';
import { AboutComponent } from './components/non-authorized/about/about.component';
import { ContactComponent } from './components/non-authorized/contact/contact.component';
import { AuthHeaderComponent } from './components/authorized/auth-header/auth-header.component';
import { AuthLayoutComponent } from './components/authorized/auth-layout/auth-layout.component';
import { AuthIndexComponent } from './components/authorized/auth-index/auth-index.component';

@NgModule({
  declarations: [
    AppComponent,
    NonAuthHeaderComponent,
    FooterComponent,
    NonAuthLayoutComponent,
    WhyReadytaskComponent,
    SectionComponent,
    NonAuthIndexComponent,
    LoginComponent,
    RegisterComponent,
    TutorialComponent,
    AboutComponent,
    ContactComponent,
    AuthHeaderComponent,
    AuthLayoutComponent,
    AuthIndexComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
