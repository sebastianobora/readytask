import { NgModule } from '@angular/core';
import {ExtraOptions, RouterModule, Routes} from '@angular/router';

import { NonAuthLayoutComponent } from './components/non-authorized/non-auth-layout/non-auth-layout.component';
import {NonAuthIndexComponent} from './components/non-authorized/non-auth-index/non-auth-index.component';
import {LoginComponent} from './components/non-authorized/authorization/login/login.component';
import {RegisterComponent} from './components/non-authorized/authorization/register/register.component';
import {AuthLayoutComponent} from './components/authorized/auth-layout/auth-layout.component';
import {TodoComponent} from './components/authorized/todo/todo.component';
import {AuthSectionComponent} from './components/authorized/auth-section/auth-section.component';
import {TeamsListComponent} from './components/authorized/teams/teams-list/teams-list.component';
import {AddTeamComponent} from './components/authorized/teams/manage-team/add-team/add-team.component';
import {JoinTeamComponent} from './components/authorized/teams/manage-team/join-team/join-team.component';
import {TeamComponent} from './components/authorized/teams/team/team.component';

const routes: Routes = [
  {
    path: '',
    component: NonAuthLayoutComponent,
    children: [
      { path: '', component: NonAuthIndexComponent, pathMatch: 'full'},
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent }
    ]
  },
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      {
        path: 'todo',
        component: AuthSectionComponent,
        children: [
          { path: '', component: TodoComponent}
        ]
      },
      {
        path: 'tasks',
        component: AuthSectionComponent,
        children: []
      },
      {
        path: 'teams',
        component: AuthSectionComponent,
        children: [
          {path: '', redirectTo: 'my-teams', pathMatch: 'full'},
          {path: 'team/:id', component: TeamComponent},
          {path: 'my-teams', component: TeamsListComponent},
          {path: 'add-team', component: AddTeamComponent},
          {path: 'join-team', component: JoinTeamComponent}
        ]
      },
    ]
  }
];

const routerExtraOptions: ExtraOptions = {
  useHash: false,
  anchorScrolling: 'enabled',
  scrollOffset: [0, 60],
  onSameUrlNavigation: 'reload'
};

@NgModule({
  imports: [RouterModule.forRoot(routes, routerExtraOptions)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
