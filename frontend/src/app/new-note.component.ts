import { WebService } from './web.service';
import { Component } from '@angular/core';
import { AuthService } from './auth.service';
import { MatSnackBar } from '@angular/material';


// if user is not authenticated hide input forms and button
@Component({
    selector: 'new-note',
    template: `
    <mat-card *ngIf="auth.isAuthenticated" class="card">
        <mat-card-content>
            <mat-input-container>
                <textarea id="NoteTextBox"  [(ngModel)]="note.noteText" matInput placeholder = "Post your note here!"></textarea>
            </mat-input-container>
            <mat-card-actions>
                <button id="submitNote" (click)="post()"  mat-raised-button color="primary">POST</button>
            </mat-card-actions>
        </mat-card-content>
    </mat-card>
             `
})

export class NewNoteComponent {

    constructor(private webService: WebService, private auth: AuthService, private sb: MatSnackBar){}

    //this displays the message
    note = {
        OwnerId: this.auth.Id,
        owner: this.auth.userName,
        noteText: "",
        date: (new Date()).toLocaleString('en-US'),
        noteActive: '1'
    }

    post(){
        this.sb.open("Note Posted!", 'close', { duration: 5000 });
        this.webService.postNote(this.note);
    }

}