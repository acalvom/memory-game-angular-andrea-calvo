import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [PreferencesmanagerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
