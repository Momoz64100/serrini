import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';
import { Globals } from './globals';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private authService: AuthService, private router: Router, private globals: Globals) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        let url: string = state.url;
        return this.checkLogin(url);
    }
    
    checkLogin(url: string): boolean {
        if (this.globals.isLoggedIn)
            return true;

        this.authService.redirectUrl = url;
        this.router.navigate(['/login']);
        return false;
    }
}