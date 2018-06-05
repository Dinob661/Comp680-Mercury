import { Component, OnInit } from '@angular/core';
import { NavComponent } from './nav.component';
import { AgmCoreModule } from '@agm/core';
import { WebService } from './web.service';
import { AuthService } from './auth.service';
import { MatSnackBar } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import {RouterModule} from '@angular/router';
declare var google: any;

@Component({
    selector: 'map',
    template: `
    <new-message></new-message>
    <messages></messages>`,
    styleUrls: ['./map.component.css']
})

export class RedirectComponent {
    constructor(private webService: WebService,private route: ActivatedRoute, private auth: AuthService, private sb: MatSnackBar, private router: Router) {}
    ngOnInit(){
        this.router.navigate(['./markers/' + this.auth.userName]);
    }


}


