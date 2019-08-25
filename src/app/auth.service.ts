import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Globals } from './globals';
import { UserService } from './services/user.service';
import { Users } from './entities/users';

@Injectable()
export class AuthService {
	redirectUrl: string;

	constructor(private globals: Globals, private userService: UserService) {

	}

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

	load() : Promise<boolean> {
		console.log("load");
		
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
                        localStorage.setItem('loggedIn', 'true');
                        localStorage.setItem('userId', x.id);
                        this.globals.isLoggedIn = true;
                        this.globals.currentUser = x;
                        resolve(true);
                    }
                });
            });
        })
    }

	private setUser(user: Users) {
		localStorage.setItem('loggedIn', 'true');
		localStorage.setItem('userId', user.id);
		this.globals.isLoggedIn = true;
		this.globals.currentUser = user;
	}
}