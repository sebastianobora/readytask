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
import { AuthSectionComponent } from './components/authorized/auth-section/auth-section.component';
import { AuthNavComponent } from './components/authorized/auth-nav/auth-nav.component';
import { TodoComponent } from './components/authorized/todo/todo.component';
import { HttpClientModule } from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { TeamsListComponent } from './components/authorized/teams/teams-list/teams-list.component';
import { AddTeamComponent } from './components/authorized/teams/manage-team/add-team/add-team.component';
import { JoinTeamComponent } from './components/authorized/teams/manage-team/join-team/join-team.component';
import { TeamComponent } from './components/authorized/teams/team/team.component';
import {ClipboardModule} from 'ngx-clipboard';
import {TooltipModule} from 'ng2-tooltip-directive';

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
    AuthSectionComponent,
    AuthNavComponent,
    TodoComponent,
    TeamsListComponent,
    AddTeamComponent,
    JoinTeamComponent,
    TeamComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        FormsModule,
        ClipboardModule,
        TooltipModule,
        ReactiveFormsModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
