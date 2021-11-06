import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {NonAuthHeaderComponent} from './components/non-authorized/non-auth-header/non-auth-header.component';
import {FooterComponent} from './components/common/footer/footer.component';
import {NonAuthLayoutComponent} from './components/non-authorized/non-auth-layout/non-auth-layout.component';
import {WhyReadytaskComponent} from './components/non-authorized/why-readytask/why-readytask.component';
import {SectionComponent} from './components/common/section/section.component';
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
import {QuillModule} from 'ngx-quill';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatNativeDateModule, MatRippleModule} from '@angular/material/core';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {A11yModule} from '@angular/cdk/a11y';
import {PickTeamDialogComponent} from './components/authorized/tasks/add-task/add-task-dialogs/pick-team-dialog/pick-team-dialog.component';
import {MatDialogModule} from '@angular/material/dialog';
import {PickUserDialogComponent} from './components/authorized/tasks/add-task/add-task-dialogs/pick-user-dialog/pick-user-dialog.component';
import {PickDateDialogComponent} from './components/authorized/tasks/add-task/add-task-dialogs/pick-date-dialog/pick-date-dialog.component';
import {MatCardModule} from '@angular/material/card';
import {TaskComponent} from './components/authorized/tasks/task/task.component';
import {MatTreeModule} from '@angular/material/tree';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {NotificationComponent} from './components/common/notification/notification.component';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatTabsModule} from '@angular/material/tabs';
import {ConfirmationComponent} from './components/common/confirmation/confirmation.component';
import {TeamDetailsComponent} from './components/authorized/teams/team/team-details/team-details.component';
import {ParticipantsComponent} from './components/authorized/teams/team/participants/participants.component';
import {MatTableModule} from '@angular/material/table';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {TeamForumComponent} from './components/authorized/teams/team/forum/team-forum/team-forum.component';
import {TrimTextPipe} from './pipes/trim-text.pipe';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatIconModule} from '@angular/material/icon';
import {AddPostComponent} from './components/authorized/teams/team/forum/add-post/add-post.component';
import {PostComponent} from './components/authorized/teams/team/forum/post/post.component';
import {FocusOnChangeDirective} from './directives/focus-on-change.directive';
import {InformationComponent} from './components/common/information/information.component';
import {PublicProfileComponent} from './components/authorized/profile/public-profile/public-profile.component';
import {PlaceholderComponent} from './components/common/placeholder/placeholder.component';
import {CloseAccountComponent} from './components/authorized/profile/close-account/close-account.component';
import {ManageProfileComponent} from './components/authorized/profile/manage-profile/manage-profile.component';
import {EditAccountComponent} from './components/authorized/profile/edit-account/edit-account.component';
import {ChangePhotoComponent} from './components/authorized/profile/change-photo/change-photo.component';
import {AngularFireModule} from '@angular/fire/compat';
import {firebaseConfig} from '../assets/firebase-config';
import {AngularFireStorageModule} from '@angular/fire/compat/storage';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MarkedTestComponent} from './components/authorized/tasks/marked-test/marked-test.component';

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
    AddTaskComponent,
    PickTeamDialogComponent,
    PickUserDialogComponent,
    PickDateDialogComponent,
    TaskComponent,
    NotificationComponent,
    ConfirmationComponent,
    TeamDetailsComponent,
    ParticipantsComponent,
    TeamForumComponent,
    TrimTextPipe,
    AddPostComponent,
    PostComponent,
    FocusOnChangeDirective,
    InformationComponent,
    PublicProfileComponent,
    PlaceholderComponent,
    CloseAccountComponent,
    ManageProfileComponent,
    EditAccountComponent,
    ChangePhotoComponent,
    MarkedTestComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ClipboardModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatMenuModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
    QuillModule.forRoot(),
    MatDatepickerModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatInputModule,
    MatSelectModule,
    A11yModule,
    MatDialogModule,
    MatCardModule,
    MatTreeModule,
    MatSnackBarModule,
    MatPaginatorModule,
    MatTabsModule,
    MatTableModule,
    MatButtonToggleModule,
    MatRippleModule,
    MatExpansionModule,
    MatIconModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireStorageModule,
    MatProgressBarModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
    AuthGuard,
    NonAuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
