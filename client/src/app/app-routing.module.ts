import {NgModule} from '@angular/core';
import {ExtraOptions, RouterModule, Routes} from '@angular/router';

import {NonAuthLayoutComponent} from './components/non-authorized/non-auth-layout/non-auth-layout.component';
import {NonAuthIndexComponent} from './components/non-authorized/non-auth-index/non-auth-index.component';
import {LoginComponent} from './components/non-authorized/authorization/login/login.component';
import {RegisterComponent} from './components/non-authorized/authorization/register/register.component';
import {AuthLayoutComponent} from './components/authorized/auth-layout/auth-layout.component';
import {TodoComponent} from './components/authorized/todo/todo.component';
import {TeamsListComponent} from './components/authorized/teams/teams-list/teams-list.component';
import {AddTeamComponent} from './components/authorized/teams/manage-team/add-team/add-team.component';
import {JoinTeamComponent} from './components/authorized/teams/manage-team/join-team/join-team.component';
import {TeamComponent} from './components/authorized/teams/team/team.component';
import {AuthGuard} from './security/auth.guard';
import {NonAuthGuard} from './security/non-auth.guard';
import {AddTaskComponent} from './components/authorized/tasks/add-task/add-task.component';
import {TaskComponent} from './components/authorized/tasks/task/task.component';

const routes: Routes = [
  {
    path: '',
    component: NonAuthLayoutComponent,
    children: [
      {path: '', component: NonAuthIndexComponent, pathMatch: 'full'},
      {path: 'login', component: LoginComponent},
      {path: 'register', component: RegisterComponent}
    ],
    canActivate: [NonAuthGuard]
  },
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      {path: 'todo', component: TodoComponent},
      {path: 'teams', redirectTo: 'teams/my-teams'},
      {path: 'teams/my-teams', component: TeamsListComponent},
      {path: 'teams/join-team', component: JoinTeamComponent},
      {path: 'teams/add-team', component: AddTeamComponent},
      {path: 'teams/team/:id', component: TeamComponent},
      {path: 'tasks', redirectTo: 'tasks/add-task'},
      {path: 'tasks/add-task', component: AddTaskComponent},
      {path: 'tasks/task/:id', component: TaskComponent},
    ],
    canActivate: [AuthGuard]
  },
  {path: '**', redirectTo: ''}
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
export class AppRoutingModule {
}
