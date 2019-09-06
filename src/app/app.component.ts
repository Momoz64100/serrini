import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Globals } from './globals';
import { Router } from '@angular/router';
declare var $: any;

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
    $(function () {
      $('.sidebar-collapse a').click(function () {
        $('li').removeClass('active');
        $(this).closest('li').addClass('active');
      });

      $('.collapser a').click(function (event) {
        $('.collapser').toggleClass('active');
      });
    });
  }

  logout() {
    this.globals.isLoggedIn = false;
    localStorage.removeItem('loggedIn');
    localStorage.removeItem('userId');
    localStorage.removeItem('isAdmin');
    this.router.navigate(['login']);
  }
}
