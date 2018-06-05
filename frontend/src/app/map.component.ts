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
    templateUrl:'map.component.html',
    styleUrls: ['./map.component.css']
})

export class MapComponent {
    constructor(private webService: WebService,private route: ActivatedRoute, private auth: AuthService, private sb: MatSnackBar, private router: Router) {}
    ngOnInit(){
        var name = this.route.snapshot.params['name'];
        this.webService.getMarkers(name);
        this.webService.getUser().subscribe();
    }
    //the room to request from Waldo
    room:'';
    //the number of the id to delete
    markerId: number;


    //start position
    zoom: number = 15;
    lat: number =34.241037;
    lng: number = -118.527674;

    //map markers
    markers: marker[] = [];


    addRoom(){
        this.webService.getMarkerWaldo(this.room);
    }

    deleteUserRoom(){
        this.webService.deleteUserMarker(this.markerId);
        this.router.navigate(['./redirect']);
    }

}
    //marker type
    interface marker{
        ownerId: string;
        owner: string;
        name?: string;
        lat: number;
        lng: number;
        bldg: string;
    }


