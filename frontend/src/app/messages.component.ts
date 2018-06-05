import { Component } from '@angular/core'
import { WebService } from './web.service'
import { ActivatedRoute } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
    selector: 'messages',
    template: `
    <div *ngFor="let message of webService.messages | async">
        <mat-card *ngIf="message.msgActive === '1' " color="purple-green" class="card">
            <mat-card-content [routerLink]="['/messages', message.owner]" style="cursor: pointer">
                <font face="verdana" font size ="4">{{message.owner}}</font>
            </mat-card-content>
            <mat-card-content>{{message.text}}</mat-card-content>
            <mat-card-content>{{message.date}}</mat-card-content>
            <button  id='{{message.messageId}}' *ngIf="auth.userName === message.owner" 
            [routerLink]="['/edit/',message.messageId]" style="cursor: pointer">
                <font face="verdana" font size ="1">
                    Edit
                </font>
            </button> 
        </mat-card>
    </div>
    `
})
export class MessagesComponent {
    constructor(private webService : WebService, private route: ActivatedRoute, private auth: AuthService) {}

    ngOnInit(){
        var name = this.route.snapshot.params['name'];
        this.webService.getMessages(name);
        this.webService.getUser().subscribe();
    }
}