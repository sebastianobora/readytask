import { NgModule } from '@angular/core';
import {ExtraOptions, RouterModule, Routes} from '@angular/router';

import { NonAuthLayoutComponent } from './components/non-authorized/non-auth-layout/non-auth-layout.component';
import {NonAuthIndexComponent} from './components/non-authorized/non-auth-index/non-auth-index.component';
import {LoginComponent} from './components/non-authorized/authorization/login/login.component';
import {RegisterComponent} from './components/non-authorized/authorization/register/register.component';
import {AuthLayoutComponent} from './components/authorized/auth-layout/auth-layout.component';
import {TodoListComponent} from './components/authorized/todo/todo-list/todo-list.component';
import {AuthSectionComponent} from './components/authorized/auth-section/auth-section.component';

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
          { path: '', redirectTo: 'all', pathMatch: 'full'},
          { path: 'all', component: TodoListComponent}
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
        children: []
      }
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
