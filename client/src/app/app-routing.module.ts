import { NgModule } from '@angular/core';
import {ExtraOptions, RouterModule, Routes} from '@angular/router';

import { NonAuthLayoutComponent } from './components/non-auth-layout/non-auth-layout.component';
import {NonAuthIndexComponent} from './components/non-auth-index/non-auth-index.component';
import {LoginComponent} from './components/authorization/login/login.component';
import {RegisterComponent} from './components/authorization/register/register.component';

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
  { path: '**', redirectTo: ''}
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
