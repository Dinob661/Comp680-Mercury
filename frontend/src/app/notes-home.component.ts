import { Component } from '@angular/core';
import { NotesComponent } from './notes.component';
import { NavComponent } from './nav.component';

//this page holds the frontend template info.
@Component({
  selector: 'notes-home',
  template: `
  <new-note></new-note>
  <notes></notes>`,
  
  styleUrls: ['./app.component.css']
})
export class NotesHomeComponent {}