import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss']
})
export class LoginComponent {
	login: string;
	password: string;

	constructor(private router: Router, private authService: AuthService) { 
		
	}

	connect() {
		this.authService.loginByLogin(this.login, this.password).subscribe(x => {
			if (x === true) {
				let redirect = this.authService.redirectUrl ? this.authService.redirectUrl : '';
				this.router.navigate([redirect]);
			} else {
				this.password = '';
			}
		});
	}
}