import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Globals } from './globals';
import { UserService } from './services/user.service';
import { Users } from './entities/users';

@Injectable()
export class AuthService {
	redirectUrl: string;

	constructor(private globals: Globals, private userService: UserService) { }

	loginByLogin(login: string, password: string): Observable<boolean> {
		return new Observable(observer => {
			var users: Users[];
			this.userService.getUsers().subscribe(data => {
				users = data.map(x => {
					return {
						id: x.payload.doc.id,
						...x.payload.doc.data()
					} as Users
				});

				users.forEach(x => {
					if (x.login == login.toLowerCase() && x.password === password) {
						this.setUser(x);
						observer.next(true);
						observer.complete();
					}
					else {
						observer.next(false);
					}
				});
			});
		})
	}

	load(): Promise<boolean> {
		return new Promise((resolve, reject) => {
			var users: Users[];
			this.userService.getUsers().subscribe(data => {
				users = data.map(x => {
					return {
						id: x.payload.doc.id,
						...x.payload.doc.data()
					} as Users
				});

				users.map(x => {
					if (x.id === localStorage.getItem('userId')) {
						this.globals.isLoggedIn = true;
						this.globals.currentUser = x;
						localStorage.setItem('loggedIn', 'true');
						localStorage.setItem('userId', x.id);
						resolve(true);
					}
				});
			});
		})
	}

	private setUser(user: Users) {
		localStorage.setItem('loggedIn', 'true');
		localStorage.setItem('userId', user.id);
		if (["ADMIN"].some(x => user.roles.split(';').includes(x)))
			localStorage.setItem('isAdmin', "true");
		else
			localStorage.setItem('isAdmin', "false");

		this.globals.isLoggedIn = true;
		this.globals.currentUser = user;
	}
}