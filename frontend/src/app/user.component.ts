import { Component } from '@angular/core';
import { WebService } from './web.service';
import { MatSnackBar } from '@angular/material';
import { AuthService } from './auth.service';
import {RouterModule} from '@angular/router';


@Component({
    selector: 'user',
    template: ` 
            <mat-card class="card">
                <mat-input-container>
                    <input matInput id="firstNameChange" [(ngModel)]="model.firstName" placeholder="First Name">
                </mat-input-container>
                <mat-input-container>
                    <input matInput id="lastNameChange" [(ngModel)]="model.lastName" placeholder="Last Name">
                </mat-input-container>
                <mat-input-container>
                    <input matInput id="emailChange" [(ngModel)]="model.email" placeholder="email">
                </mat-input-container>
                <mat-input-container>
                    <input matInput id="passwordChange" [(ngModel)]="model.password" placeholder="password">
                </mat-input-container>
                <button mat-raised-button id="saveUserButton" color="primary" (click) = "saveUser(model)">Save Changes</button>
                <button mat-raised-button id="deleteUserButton" color="primary" (click) = "deleteUser(model)" routerLink="/login">Delete Account</button>
            </mat-card>

             `
})

export class UserComponent {

    model = {
        firstName: '',
        lastName:'',
        email:'',
        userActive:''
    }

    constructor(private webService: WebService, private sb: MatSnackBar, private auth: AuthService){}
       
    ngOnInit(){
        this.webService.getUser().subscribe( res => {
            this.model.firstName = res.firstName;
            this.model.lastName = res.lastName;
            this.model.email = res.email;
            this.model.userActive = res.userActive;
        })
    }
    saveUser(userData){
        this.webService.saveUser(userData).subscribe();
        this.sb.open("Information Updated!", 'close', { duration: 5000 });
    }

    deleteUser(userData){
        userData.userActive = '0';
        this.webService.saveUser(userData).subscribe();
        this.auth.logout();
        this.sb.open("Account Deleted", 'close', { duration: 5000 });
    }
}