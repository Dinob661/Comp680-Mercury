import { Component, OnInit } from '@angular/core';
import { NavComponent } from './nav.component';
//this page holds the frontend template info.
@Component({
  selector: 'app-root',
  template: `
  <nav></nav>
  <router-outlet></router-outlet>
  `,

})
export class AppComponent {

  constructor() { }
}