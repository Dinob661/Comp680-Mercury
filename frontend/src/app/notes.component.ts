import { Component } from '@angular/core'
import { WebService } from './web.service'
import { ActivatedRoute } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
    selector: 'notes',
    template: `
    <div *ngFor="let note of webService.notes | async">
        <mat-card *ngIf="note.owner === auth.userName" color="purple-green" class="card">
            <mat-card-content [routerLink]="['/notes', note.owner]" style="cursor: pointer">
                <font face="verdana" font size ="4">{{note.owner}}</font>
            </mat-card-content>
            <mat-card-content>{{note.noteText}}</mat-card-content>
            <mat-card-content>{{note.date}}</mat-card-content>
        </mat-card>
    </div>
    `
})
export class NotesComponent {
    constructor(private webService : WebService, private route: ActivatedRoute, private auth: AuthService) {}
    ngOnInit(){
        var name = this.route.snapshot.params['name'];
        this.webService.getNotes(name);
        this.webService.getUser().subscribe();
    }
}