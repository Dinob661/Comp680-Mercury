import { Component } from '@angular/core';
import { AuthService } from './auth.service';
import {MatInputModule} from '@angular/material';
import { MatSnackBar } from '@angular/material';


@Component({
    selector: 'login',
    template: ` 
                <mat-card *ngIf="!auth.isAuthenticated">
                    <mat-input-container>
                        <input matInput id="loginEmail" [(ngModel)]="loginData.email" placeholder = "Email" type = "email">
                    </mat-input-container>
                    <mat-input-container>
                    <input matInput id="loginPassword"  [(ngModel)]="loginData.password" placeholder = "Password" type = "password">
                </mat-input-container>
                <button id="loginButton"  mat-raised-button color="primary" (click)="login()">Login</button>
                </mat-card>
             `
})

export class LoginComponent {
    constructor(private auth: AuthService, private sb: MatSnackBar){}

    loginData ={
        email:'',
        password:''
    }

    login(){
        this.auth.login(this.loginData);
    }
 
}