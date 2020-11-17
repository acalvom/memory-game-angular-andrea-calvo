import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {StartComponent} from './start/start.component';
import {PreferencesComponent} from './preferences/preferences.component';
import {PlayComponent} from './play/play.component';
import {RecordsComponent} from './records/records.component';
import {LoginComponent} from './login/login.component';
import {SigninComponent} from './signin/signin.component';

const routes: Routes = [
  { path: 'start', component: StartComponent},
  { path: 'preferences', component: PreferencesComponent},
  { path: 'play', component: PlayComponent},
  { path: 'records', component: RecordsComponent},
  { path: 'login', component: LoginComponent},
  { path: 'signin', component: SigninComponent},
  { path: '', redirectTo: 'start', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
