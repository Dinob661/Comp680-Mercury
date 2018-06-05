import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RouterModule} from '@angular/router';
import {LoginComponent } from './login.component';
import { AgmCoreModule } from '@agm/core';
//added
import { Component, Inject, enableProdMode } from '@angular/core';
import { Http, Response, RequestOptionsArgs } from '@angular/http';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { DxSchedulerModule } from 'devextreme-angular';
import 'rxjs/Rx';
import DataSource from 'devextreme/data/data_source';
import CustomStore from 'devextreme/data/custom_store';



import{
  MatButtonModule,
  MatCardModule,
  MatInputModule,
  MatSnackBarModule,
  MatToolbarModule
} from '@angular/material';

import { AppComponent } from './app.component';
import { MessagesComponent } from './messages.component';
import { HttpModule } from '@angular/http';
import { WebService } from './web.service';
import { NewMessageComponent} from './new-message.component';
import { NewNoteComponent} from './new-note.component';
import { NotesComponent} from './notes.component';
import { NavComponent } from './nav.component';
import { HomeComponent} from './home.component';
import { NotesHomeComponent} from './notes-home.component';
import {RegisterComponent } from './register.component';
import { AuthService } from './auth.service';
import {UserComponent} from './user.component';
import {EditComponent} from './edit.component'
import {CalComponent} from './cal.component';
import {MapComponent} from './map.component';
import {RedirectComponent} from './map.redirect.component';
//use for refresh
import {HashLocationStrategy, LocationStrategy} from '@angular/common';


//routes home is default route
var routes =[
  {
  path: 'messages',
  component: HomeComponent
},
{//to see all messages (regardless of user)
  path: '',
  component: MessagesComponent
},
//to see only a specific users messages
{
  path: 'messages/:name',
  component: MessagesComponent
},

//return users messages
{
  path: 'messages/:me',
  component: MessagesComponent
},
//Registration path
{
  path: 'register',
  component: RegisterComponent
},
//Login Path
{
  path: 'login',
  component: LoginComponent
},
//edit message
{
  path: 'edit/:messageId',
  component: EditComponent
},
//take user to calendar
{
  path: 'calendar/:me',
  component: CalComponent
},
//take user to map
{
  path: 'markers/:name',
  component: MapComponent
},

//return users messages
{
  path: 'notes/:me',
  component: NotesHomeComponent
},
//User
{
  path: 'user',
  component: UserComponent
},
//redirect page
{
  path: 'redirect',
  component: RedirectComponent
},
];

@NgModule({
  declarations: [
    AppComponent, MapComponent, CalComponent,MessagesComponent, NewMessageComponent, NotesComponent, NewNoteComponent, NavComponent, HomeComponent,NotesHomeComponent, RegisterComponent, LoginComponent, UserComponent, EditComponent
    , RedirectComponent],
  imports: [
    BrowserModule, 
    BrowserAnimationsModule, 
    BrowserAnimationsModule, 
    MatButtonModule, 
    MatCardModule,
    MatInputModule,
    MatSnackBarModule,
    MatToolbarModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    AgmCoreModule.forRoot({ //This is for the map and the api key for our app.
      apiKey: 'AIzaSyA4hnV2HHkXY3deIdkWGUOOOiUE2HvctU4'
    }),
    RouterModule.forRoot(routes),
    DxSchedulerModule,
  ],
  exports: [
    BrowserModule, 
    BrowserAnimationsModule, 
    BrowserAnimationsModule, 
    MatButtonModule, 
    MatCardModule,
    MatInputModule,
    MatSnackBarModule,
    MatToolbarModule,
    HttpModule,
    CalComponent,
    RedirectComponent,
    //added
  ],
  providers: [WebService, AuthService, {provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule { }
