import { Component } from '@angular/core'
import { WebService } from './web.service'
import { ActivatedRoute } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
    selector: 'cal',
    template: `
    <div *ngFor="let calendar of webService.calendars | async;">
    <div *ngFor="let m of calendar.items; let i =index">
        <mat-card color="purple-green" class="card">
            <mat-card-content style="cursor: pointer">
                <font face="verdana" font size ="4">{{calendar.items[i].summary}}</font>
            </mat-card-content>
            <mat-card-content>Date: {{calendar.items[i].start.date}}</mat-card-content>
        </mat-card>
        </div>
    </div>
    `
})
export class CalComponent {
    constructor(private webService : WebService, private route: ActivatedRoute, private auth: AuthService) {}

    ngOnInit(){
        this.webService.getCalendarData();
    }
}