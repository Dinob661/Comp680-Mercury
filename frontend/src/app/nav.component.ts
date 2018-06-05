import { Component } from '@angular/core';
import { AuthService } from './auth.service';
import {RouterModule} from '@angular/router';

//Add back My-Posts once it is ready
// Pass in info from backend to nav bar. example auth.userName returns username obtained from DB
@Component({
    selector: 'nav',
    template: ` 
    <mat-toolbar color="purple-green" font-family="Sans-serif">
            Mercury
            <button id="homeNavButton" mat-button routerLink="/">Home</button>
            <button id="postNavButton" *ngIf="auth.isAuthenticated" mat-button routerLink="/messages">Post Message</button>
            <button id="myPostNavButton" *ngIf="auth.isAuthenticated" mat-button [routerLink]="['/messages', auth.userName]">My Posts</button>
            <button id="notesNavButton" *ngIf="auth.isAuthenticated" mat-button [routerLink]="['/notes', auth.userName]">My Notes</button>
            <button id="calendarNavButton" *ngIf="auth.isAuthenticated" mat-button [routerLink]="['/calendar', auth.userName]">My Calendar</button>
            <button id="mapNavButton" *ngIf="auth.isAuthenticated" mat-button [routerLink]="['/markers', auth.userName]">Map</button>
            <span style="flex:1 1 auto"></span>
            <button id="loginNavButton" *ngIf="!auth.isAuthenticated" mat-button routerLink="/login">Login</button>
            <button id="registerNavButton" *ngIf="!auth.isAuthenticated" mat-button routerLink="/register">Register</button>
            <button id="welcomeNavButton" *ngIf="auth.isAuthenticated" mat-button routerLink="/user">Welcome {{auth.userName}}</button>
            <button id="logoutNavButton"*ngIf="auth.isAuthenticated" mat-button routerLink="/login" (click)="auth.logout()">Logout</button>
        </mat-toolbar>
             `
})

export class NavComponent {
    constructor(private auth: AuthService){



    }
 
}