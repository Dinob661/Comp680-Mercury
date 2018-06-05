import { WebService } from './web.service';
import { Component } from '@angular/core';
import { AuthService } from './auth.service';
import { MatSnackBar } from '@angular/material';
import { ActivatedRoute} from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';


// if user is not authenticated hide input forms and button
@Component({
    selector: 'edit',
    template: `
    <mat-card *ngIf="auth.isAuthenticated" class="card">
        <mat-card-content>
            <mat-input-container>
                <textarea id="editTextBox" [(ngModel)]="message.text" matInput placeholder = "This Is your Message to edit!"></textarea>
            </mat-input-container>
            <mat-card-actions>
                <button id="updateButton" (click)="update()" routerLink="/" mat-raised-button color="primary">Update Message</button>
            </mat-card-actions>
            <mat-card-actions>
            <button id="deleteButton" (click)="delete()" routerLink="/" mat-raised-button color="primary">Delete Message</button>
        </mat-card-actions>
        </mat-card-content>
    </mat-card>
             `
})

export class EditComponent {
    message = {
        messageId: '',
        owner:'',
        text:'',
        msgActive:''
    }

    constructor(private webService: WebService, private auth: AuthService, private sb: MatSnackBar, private route: ActivatedRoute){
    }

    ngOnInit(){
        var Id = this.route.snapshot.params['messageId'];
        this.webService.getMessageToEdit(Id).subscribe( res => {
            this.message.messageId = res[0].messageId;
            this.message.owner = res[0].owner;
            this.message.text = res[0].text;
            this.message.msgActive = res[0].msgActive;
        })
    }

    update(){
        this.sb.open("Message Updated!", 'close', { duration: 5000 });
        this.webService.updateMessage(this.message);
    }

    delete(){
        this.sb.open("Message Deleted!", 'close', { duration: 5000 });
        this.webService.deleteMessage(this.message);

    }

}