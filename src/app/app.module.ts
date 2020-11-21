import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StartComponent } from './start/start.component';
import { PreferencesComponent } from './preferences/preferences.component';
import { PlayComponent } from './play/play.component';
import { RecordsComponent } from './records/records.component';
import { LoginComponent } from './login/login.component';
import { SigninComponent } from './signin/signin.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import {FormsModule} from '@angular/forms';
import {PreferencesmanagerService} from './shared/services/preferencesmanager.service';
import {RecordrestService} from './shared/services/recordrest.service';
import {UsersrestService} from './shared/services/usersrest.service';
import { LogoutComponent } from './logout/logout.component';

@NgModule({
  declarations: [
    AppComponent,
    StartComponent,
    PreferencesComponent,
    PlayComponent,
    RecordsComponent,
    LoginComponent,
    SigninComponent,
    PagenotfoundComponent,
    LogoutComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [PreferencesmanagerService, RecordrestService, UsersrestService],
  bootstrap: [AppComponent]
})
export class AppModule { }
