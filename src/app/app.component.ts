import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Globals } from './globals';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { AppProvider } from './app.provider';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(
    public globals: Globals,
    private router: Router,
    private authService: AuthService) { }

  ngOnInit() {
    // this.authService.load();
  }

  logout() {
    this.globals.isLoggedIn = false;
    localStorage.removeItem('loggedIn');
    localStorage.removeItem('userId');
    localStorage.removeItem('isAdmin');
    this.router.navigate(['login']);
  }
}
