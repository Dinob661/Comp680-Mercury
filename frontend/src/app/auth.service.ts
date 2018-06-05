import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { NULL_EXPR } from '@angular/compiler/src/output/output_ast';

@Injectable()
export class AuthService {
    LINK = 'http://localhost:58630/auth';
    USER_NAME = 'userName';    
    FIRST_NAME = 'firstName';   
    LAST_NAME = 'lastName';    
    BACKEND_TOKEN = 'token';
    USER_ID = "id";


    constructor(private http: Http, private router: Router, private sb: MatSnackBar) { }
    // passed in from authenticate below
    get userName() {
        return localStorage.getItem(this.USER_NAME);
    }

    // passed in from authenticate below
    get firstName() {
        return localStorage.getItem(this.FIRST_NAME);
    }

    // passed in from authenticate below
    get lastName() {
        return localStorage.getItem(this.LAST_NAME);
    }
    get Id(){
        return localStorage.getItem(this.USER_ID);
    }

    get isAuthenticated() {
        //local storage gets checked to see if token received from backend if received then true if not then false
        return !!localStorage.getItem(this.BACKEND_TOKEN);
    }

    get tokenHeader() {
        var header = new Headers({'Authorization': 'Bearer ' + localStorage.getItem(this.BACKEND_TOKEN)});
        return new RequestOptions({ headers: header});
    }

    login(loginData) {
        this.http.post(this.LINK + '/login', loginData).subscribe(res => {
            this.authenticate(res);
            if(localStorage.getItem(this.FIRST_NAME)!= null){
                this.sb.open("Login Successful!!", 'close', { duration: 5000 });
            }
        })
        if(localStorage.getItem(this.FIRST_NAME)!= null){
            this.sb.open("Login Successful!!", 'close', { duration: 5000 });
        }else{
            this.sb.open("Login Failed!!", 'close', { duration: 5000 });
        }
    }

    // uses the authentication below 
    register(user) {
        delete user.confirmPassword;
        this.http.post(this.LINK + '/register', user).subscribe(res => {
            this.authenticate(res);
        });
    }

    // deletes information from localstorage once logged out
    logout() {
        this.sb.open("Logout Successful!!", 'close', { duration: 5000 });
        localStorage.removeItem(this.FIRST_NAME);
        localStorage.removeItem(this.LAST_NAME);
        localStorage.removeItem(this.BACKEND_TOKEN);
        localStorage.removeItem(this.USER_NAME);
        localStorage.removeItem(this.USER_ID);
    }

    // this is what stores the users information from the back end to use on the front end (if authenticated).
    authenticate(res) {
        var authResponse = res.json();  
       if (!authResponse.token){// unsucessful login
            return;
        }

        localStorage.setItem(this.BACKEND_TOKEN, authResponse.token)
        localStorage.setItem(this.USER_NAME, authResponse.userName)
        localStorage.setItem(this.FIRST_NAME, authResponse.firstName)
        localStorage.setItem(this.LAST_NAME, authResponse.lastName)
        localStorage.setItem(this.USER_ID, authResponse.id)
        this.router.navigate(['/']);
    }

}