import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Globals } from './globals';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(
    public globals: Globals,
    private router: Router) { }

  ngOnInit() {
  }

  logout() {
    this.globals.isLoggedIn = false;
    localStorage.removeItem('loggedIn');
    localStorage.removeItem('userId');
    localStorage.removeItem('isAdmin');
    this.router.navigate(['login']);
  }
}
