import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { Globals } from '../globals';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss']
})
export class LoginComponent {
	private login: string;
	private password: string;

	constructor(private authService: AuthService, private router: Router) { }

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