import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {NonAuthHeaderComponent} from './components/non-authorized/non-auth-header/non-auth-header.component';
import {FooterComponent} from './components/footer/footer.component';
import {NonAuthLayoutComponent} from './components/non-authorized/non-auth-layout/non-auth-layout.component';
import {WhyReadytaskComponent} from './components/non-authorized/why-readytask/why-readytask.component';
import {SectionComponent} from './components/section/section.component';
import {NonAuthIndexComponent} from './components/non-authorized/non-auth-index/non-auth-index.component';
import {LoginComponent} from './components/non-authorized/authorization/login/login.component';
import {RegisterComponent} from './components/non-authorized/authorization/register/register.component';
import {TutorialComponent} from './components/non-authorized/tutorial/tutorial.component';
import {AboutComponent} from './components/non-authorized/about/about.component';
import {ContactComponent} from './components/non-authorized/contact/contact.component';
import {AuthHeaderComponent} from './components/authorized/auth-header/auth-header.component';
import {AuthLayoutComponent} from './components/authorized/auth-layout/auth-layout.component';
import {AuthNavComponent} from './components/authorized/auth-nav/auth-nav.component';
import {TodoComponent} from './components/authorized/todo/todo.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {TeamsListComponent} from './components/authorized/teams/teams-list/teams-list.component';
import {AddTeamComponent} from './components/authorized/teams/manage-team/add-team/add-team.component';
import {JoinTeamComponent} from './components/authorized/teams/manage-team/join-team/join-team.component';
import {TeamComponent} from './components/authorized/teams/team/team.component';
import {ClipboardModule} from 'ngx-clipboard';
import {TooltipModule} from 'ng2-tooltip-directive';
import {JwtInterceptor} from './security/jwt.interceptor';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {NotFoundTeamsComponent} from './components/authorized/teams/manage-team/not-found-teams/not-found-teams.component';
import {AuthGuard} from './security/auth.guard';
import {NonAuthGuard} from './security/non-auth.guard';
import {MatTooltipModule} from '@angular/material/tooltip';
import {AddTaskComponent} from './components/authorized/tasks/add-task/add-task.component';
import {MatAutocompleteModule} from '@angular/material/autocomplete';

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
    AuthNavComponent,
    TodoComponent,
    TeamsListComponent,
    AddTeamComponent,
    JoinTeamComponent,
    TeamComponent,
    NotFoundTeamsComponent,
    AddTaskComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ClipboardModule,
    TooltipModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatMenuModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
    MatAutocompleteModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
    AuthGuard,
    NonAuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
