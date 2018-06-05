import { Http, HttpModule, Response, RequestOptionsArgs } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import { Subject } from 'rxjs/Rx'
import { MatSnackBar } from '@angular/material';
import { AuthService } from './auth.service';
import { MapComponent} from './map.component';



@Injectable()
export class WebService {
    LINK = 'http://localhost:58630/api';
    LINK2 = 'https://api.sandbox.csun.edu/metalab/waldo/api/1.0/rooms?room=';
    

    private messageStore = [];
    private noteStore = [];
    private markerStore = [];
    private calendarStore =[];

    private messageSubject = new Subject();
    private noteSubject = new Subject();
    private markerSubject = new Subject();
    private calendarSubject = new Subject();
    
    messages = this.messageSubject.asObservable();
    notes = this.noteSubject.asObservable();
    markers = this.markerSubject.asObservable();
    calendars = this.calendarSubject.asObservable();
    
    //used to save JSON response from Waldo
    private newMarker;
    mark

    constructor(private http: Http, private sb: MatSnackBar, private auth: AuthService) {
        this.getMessages('');
    }

    //get the messages
    getMessages(user) {
        user = (user) ? '/' + user : '';
        this.http.get(this.LINK + '/messages' + user).subscribe(response => {
            this.messageStore = response.json();
            this.messageSubject.next(this.messageStore);
        }, error => {
            this.handleError("Unable to get messages");
        });
    }

    //get the notes
    getNotes(user) {
        user = (user) ? '/' + user : '';
        this.http.get(this.LINK + '/notes' + user).subscribe(response => {
            this.noteStore = response.json();
            this.noteSubject.next(this.noteStore);
        }, error => {
            this.handleError("Unable to get notes!");
        });
    }

    //get the class room info for the marker
    getMarkerWaldo(room) {
        this.http.get(this.LINK2 + room).subscribe(response => {
           this.newMarker =  response.json();
           console.log(this.newMarker);
           //save marker info to variables
  
        var newMarkerInfo={
            ownerId: this.auth.Id,
            owner: this.auth.userName,
            markerName: this.newMarker.rooms[0].room_number,
            lat:this.newMarker.rooms[0].latitude,
            lng:this.newMarker.rooms[0].longitude,
            bldg:this.newMarker.rooms[0].building_name,
         };
           
           //pass new info to post function (this fuction passes to backend to store in DB)
           this.postMarker(newMarkerInfo);
        }, error => {
            this.handleError("Room does not exist!");
        });
    }

        //get the Markers from our DB
        getMarkers(user) {
            user = (user) ? '/' + user : '';
            this.http.get(this.LINK + '/markers' + user).subscribe(response => {
                this.markerStore = response.json();
                this.markerSubject.next(this.markerStore);
            }, error => {
                this.handleError("Unable to get Markers from Database!");
            });
        }

    async postMessage(message) {
        try {
            var response = await this.http.post(this.LINK + '/messages', message).toPromise();
            this.messageStore.push(response.json());
            this.messageSubject.next(this.messageStore);
        } catch (error) {
            this.handleError("Unable to post message");
        }

    }

    //Google Calendar API connection and data return
    async getCalendarData() {
        let PUBLIC_KEY = 'AIzaSyBBXwQsD160KUNH0DSZDgw4ygiZgB3pX7k',
            CALENDAR_ID = 'duckyduck661@gmail.com';
        let dataUrl = [ 'https://www.googleapis.com/calendar/v3/calendars/',
                CALENDAR_ID, '/events?key=', PUBLIC_KEY].join('');

        try {
            var response = await this.http.get(dataUrl).toPromise();
            this.calendarStore.push(response.json());
            this.calendarSubject.next(this.calendarStore);
        }catch (error) {
            this.handleError("Unable to post events");
        }
    }

    private extractData(res: Response) {
        return res.json().items;
    }


    async postMarker(marker) {
        try {
            var response = await this.http.post(this.LINK + '/markers', marker).toPromise();
            this.markerStore.push(response.json());
            this.markerSubject.next(this.markerStore);
        } catch (error) {
            this.handleError("The marker did not post.");
        }
    }

        //delete users marker
         async deleteUserMarker(room) {
            try{
            var response =  await this.http.delete(this.LINK + '/markers/'+room).toPromise();
            this.handleError("Marker will be deleted the next time you return!");
            }
            catch (error){
                this.handleError("The marker did not delete.");
            }
        }

        //update markers
        async updateMarkers(user) {
            try {
                var response = await this.http.get(this.LINK + '/markers/'+ user).toPromise();
                this.markerStore.push(response.json().items);
                this.markerSubject.next(this.markerStore);
            } catch (error) {
                this.handleError("Could not get Markers.");
            }
        }

    async postNote(note) {
        try {
            var response = await this.http.post(this.LINK + '/notes', note).toPromise();
            this.noteStore.push(response.json());
            this.noteSubject.next(this.noteStore);
        } catch (error) {
            this.handleError("Unable to post note");
        }

    }

    getUser() {
        return this.http.get(this.LINK + '/users/me', this.auth.tokenHeader).map(res => res.json());
    }
    saveUser(userData) {
        return this.http.post(this.LINK + '/users/me', userData,this.auth.tokenHeader).map(res => res.json());
    }   

    getMessageToEdit(messageId) {
        return this.http.get(this.LINK + '/edit/' + messageId).map(res => res.json());
    }  

    async deleteMessage(message) {
        var response = await this.http.post(this.LINK + '/edit/' + message.messageId, message).toPromise();
        this.messageStore.push(response.json());
        this.messageSubject.next(this.messageStore);
        location.reload(true);
    }
    async updateMessage(message) {
        var response = await this.http.put(this.LINK + '/edit/' + message.messageId, message).toPromise();
        this.messageStore.push(response.json());
        this.messageSubject.next(this.messageStore);
        location.reload(true);
    }

    private handleError(error) {
        console.error(error);
        this.sb.open(error, 'close', { duration: 5000 });
    }
}